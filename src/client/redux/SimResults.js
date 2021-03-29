import { EVENT as SOCKET_EVENT } from '../utils/socketMiddleware';
import { indexBy } from 'underscore';

//#region Action
const ns = 'ACC/SIM_RESULTS/';
const INIT = ns + 'INIT';
//#endregion

//#region Reducer
const initialState = {
    allLaps: {},
    bestLaps: {},
    events: [],
    keyedEvents: {},
    positions: {},
    consistency: {},
    results: {},
    sectors: {},
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SOCKET_EVENT: {
            switch (action.payload.event) {

                case 'EVENTS': {

                    const { allLaps, bestLaps, events, positions, sectors, results, consistency } = action.payload.data;

                    return {
                        ...state,
                        allLaps,
                        bestLaps,
                        events,
                        positions,
                        results,
                        sectors,
                        consistency,
                        keyedEvents: indexBy(events, 'id'),
                    };
                }
            }
        }

        default: {
            return state;
        }
    }
}
//#endregion

//#region Selectors
const getState = (state) => {
    return state.SimResults;
};

export const getEvents = (state) => {
    return getState(state).events;
};

export const getEventById = (state, eventId) => {
    return getState(state).keyedEvents[eventId];
};

export const getLapsBySession = (state, eventId, sessionType) => {
    const event = getState(state).allLaps[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].participants;
};

export const getDriverLapsBySession = (state, eventId, sessionType) => {
    const event = getState(state).bestLaps[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].byDriver;
};

export const getTopLapsBySession = (state, eventId, sessionType) => {
    const event = getState(state).bestLaps[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].top20;
};

export const getResultsBySession = (state, eventId, sessionType) => {
    const event = getState(state).results[eventId];
    return event && event.data && event.data[sessionType];
};

export const getRacePositionsBySession = (state, eventId, sessionType) => {
    const event = getState(state).positions[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].positions;
};

export const getSectorsBySession = (state, eventId, sessionType) => {
    const event = getState(state).sectors[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].sectors;
};

export const getConsistencyBySession = (state, eventId, sessionType) => {
    const event = getState(state).consistency[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].consistency;
};
//#endregion

//#region Actions
//#endregion