import { EVENT as SOCKET_EVENT } from '../utils/socketMiddleware';
import { getLapCount, getEventKey, getTrackName, getStartTime, getSessionTypes } from '../helpers/events';

//#region Action
const ns = 'ACC/EVENTS/';
const INIT = ns + 'INIT';
//#endregion

//#region Reducer
const initialState = {
    events: [],
};

export default function (state = initialState, action) {
    switch (action.type) {

        case INIT: {
            return state;
        }

        case SOCKET_EVENT: {
            switch (action.payload.event) {

                case 'EVENTS': {
                    return {
                        ...state,
                        events: (
                            action.payload.data
                                .reverse()
                                .map(sessions => ({
                                    id: getEventKey(sessions),
                                    laps: getLapCount(sessions),
                                    // entrants: getEntrantsCount(sessions),
                                    track: getTrackName(sessions),
                                    startTime: getStartTime(sessions),
                                    sessionTypes: getSessionTypes(sessions),
                                }))
                                .filter(event => event.laps > 0)
                        ),
                    }
                }

                default: {
                    return state;
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
    return state.Events;
};

export const getEvents = (state) => {
    return getState(state).events;
};
//#endregion

//#region Actions
//#endregion