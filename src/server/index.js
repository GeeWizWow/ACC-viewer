const express = require('express');
const http = require('http');
const io = require('socket.io');
const resultsParser = require('./utils/reader/parser');

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

resultsParser.init();
resultsParser.onNewResult(results => socketServer.emit('EVENTS', results));

socketServer.attach(server);
socketServer.on('connection', socket => {
    socket.emit('EVENTS', resultsParser.getAllResults());
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}!`);
});
