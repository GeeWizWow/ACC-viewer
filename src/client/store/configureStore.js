import thunk from 'redux-thunk';
import * as rootReducer from '../redux';
import socketMiddleware from '../utils/socketMiddleware';

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { reduxBatch } from '@manaflair/redux-batch'
import { createLogger } from 'redux-logger'

const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
    diff: true,
});

export default (initialState = {}) => {

    const reducer = combineReducers({ ...rootReducer });
    
    const store = configureStore({
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware(),
            logger,
            thunk,
            socketMiddleware,
        ],
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: initialState,
        reducer: reducer,
        enhancers: [
            reduxBatch
        ],
    });

    return store;
};
