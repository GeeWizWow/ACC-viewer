import { join } from 'path';
import { readFileSync } from 'fs';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import ResultsParser from './utils/reader/parser';
import ResultsWatcher from './utils/reader/watcher';
import Cache from './utils/cache';
import Mediator from './mediator';
import Controller from './controller';

const configPath = join(process.cwd(), 'config.json');
const config = JSON.parse(readFileSync(configPath));

const app = express();
const server = http.createServer(app);
const socketServer = io({
    path: '/ws',
    serveClient: false,
});

app.use(express.static('dist/'));
app.use('/event', express.static('dist/'));
app.use('/event/:id', express.static('dist/'));
app.use('/event/:id/:session', express.static('dist/'));
app.use('/event/:id/:session/:tab', express.static('dist/'));

const parserCache = new Cache();
const controllerCache = new Cache();

const watcher = new ResultsWatcher(config);
const parser = new ResultsParser(watcher, parserCache);
const mediator = new Mediator(parser);
const controller = new Controller(mediator, controllerCache);

parser.onNewResult(() => {
    controllerCache.invalidate();
    socketServer.emit('EVENTS', controller.getFullViewModel());
});

socketServer.attach(server);
socketServer.on('connection', socket => {
    socket.emit('EVENTS', controller.getFullViewModel());
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}!`);
});
