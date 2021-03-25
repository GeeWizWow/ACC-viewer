import { EVENT as SOCKET_EVENT } from '../utils/socketMiddleware';
import { getEventKey, getTrackName, getStartTime } from '../helpers/events';
import { indexBy, map } from 'underscore';

//#region Action
const ns = 'ACC/EVENT_DETAILS/';
const INIT = ns + 'INIT';
//#endregion

//#region Reducer
const initialState = {
    events: {},
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
                        events: indexBy(
                            action.payload.data.map(sessions => ({
                                id: getEventKey(sessions),
                                track: getTrackName(sessions),
                                startTime: getStartTime(sessions),
                                sessions: map(sessions, s => s.sessionType),
                            })),
                            'id'
                        ),
                    };
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
    return state.EventDetails;
};

export const getEventById = (state, eventId) => {
    return getState(state).events[eventId];
};
//#endregion

//#region Actions
//#endregion