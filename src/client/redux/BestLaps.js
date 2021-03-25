import { EVENT as SOCKET_EVENT } from '../utils/socketMiddleware';
import { getBestLapByDrivers, getTop20Laps } from '../helpers/laps';
import { getEventKey } from '../helpers/events';

//#region Action
const ns = 'ACC/BEST_LAPS/';
const INIT = ns + 'INIT';
//#endregion

//#region Reducer

const initialState = {
    sessions: {},
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
                        sessions: action.payload.data.reduce(
                            (agg, event) => ({
                                ...agg,
                                [getEventKey(event)]: event.reduce(
                                    (sAgg, { session }) => ({
                                        ...sAgg,
                                        [session.sessionType]: {
                                            driverBest: getBestLapByDrivers(session),
                                            top: getTop20Laps(session),
                                        },
                                    }),
                                    {},
                                ),
                            }),
                            {},
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
    return state.BestLaps;
};

export const getDriverLapsBySession = (state, eventId, sessionType) => {
    const event = getState(state).sessions[eventId];
    return event && event[sessionType] && event[sessionType].driverBest;
};

export const getTopLapsBySession = (state, eventId, sessionType) => {
    const event = getState(state).sessions[eventId];
    return event && event[sessionType] && event[sessionType].top;
};
//#endregion

//#region Actions
//#endregion