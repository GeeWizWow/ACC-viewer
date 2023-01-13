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
    penalties: {},
    gaps: {},
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SOCKET_EVENT: {
            switch (action.payload.event) {

                case 'EVENTS': {

                    const { allLaps, bestLaps, events, positions, sectors, results, consistency, gaps, penalties } = action.payload.data;

                    return {
                        ...state,
                        allLaps,
                        bestLaps,
                        events,
                        positions,
                        results,
                        sectors,
                        consistency,
                        gaps,
                        penalties: penalties,
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

export const getSectorsBySession = (state, eventId, sessionType) => {
    const event = getState(state).sectors[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].sectors;
};

export const getConsistencyBySession = (state, eventId, sessionType) => {
    const event = getState(state).consistency[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].consistency;
};

export const getRacePositionsBySession = (state, eventId, sessionType) => {
    const event = getState(state).positions[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].positions;
};

export const getRaceGapsBySession = (state, eventId, sessionType) => {
    const event = getState(state).gaps[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].gaps;
};

export const getPenaltiesBySession = (state, eventId, sessionType) => {
    const event = getState(state).penalties[eventId];
    return event && event.data && event.data[sessionType] && event.data[sessionType].penalties;
};

export const hasPenaltiesBySession = (state, eventId, sessionType) => {
    const event = getState(state).penalties[eventId];
    const penalties = event && event.data && event.data[sessionType] && event.data[sessionType].penalties;
    return Boolean(penalties && penalties.length);
};
//#endregion

//#region Actions
//#endregion