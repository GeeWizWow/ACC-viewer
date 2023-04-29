const io = require('socket.io-client');

const ns = 'ACC/SOCKET/';
export const INIT = ns + 'INIT';
export const ERROR = ns + 'ERROR';
export const EVENT = ns + 'EVENT';
export const CONNECT = ns + 'CONNECT';
export const CONNECT_ERROR = ns + 'CONNECT_ERROR';
export const DISCONNECT = ns + 'DISCONNECT';

export const SocketAction = action => ({
    EMIT: `${action}:EMIT`,
});

export class SocketCall {
    constructor(options) {
        this.type = options.type;

        if (!this.type) {
            throw new Error(`Parameter type is a required value. Received: ${this.type}`);
        }

        if (!this.event) {
            throw new Error(`Parameter event is a required value. Received: ${this.event}`);
        }

        this.event = options.event;
        this.data = options.data || {};
    }
}

const createClient = (store) => {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
    const socket = io.default(`${protocol}//${window.location.host}`, {
        path: '/ws',
        autoConnect: false,
        reconnection: true,
    });

    socket.on('connect', () => store.dispatch({
        type: CONNECT,
        payload: socket.id,
    }));

    socket.on('connect_error', (err) => store.dispatch({
        type: CONNECT_ERROR,
        payload: err.message,
    }));

    socket.on('disconnect', () => store.dispatch({
        type: DISCONNECT,
    }));

    socket.onAny((event, data) => store.dispatch({
        type: EVENT,
        payload: {
            event,
            data,
        },
    }))

    socket.connect();

    return socket;
} 

let client;

export default store => next => action => {

    if (!client) {
        client = createClient(store);
    }

    if (!(action instanceof SocketCall)) {
        return next(action);
    }

    client.emit(action.event, action.data);

    store.dispatch({
        type: action.type.REQUEST,
        payload: {
            event: action.event,
            data: action.data,
        },
    });
};
