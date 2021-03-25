import { EVENT as SOCKET_EVENT } from '../utils/socketMiddleware';
import { getEventKey } from '../helpers/events';
import { getLapCount, getBestLap, getSessionLeaderboard, getRaceWinner } from '../helpers/session';

//#region Action
const ns = 'ACC/RESULT/';
const INIT = ns + 'INIT';
//#endregion

//#region Reducer
const initialLapState = {
    driver: null,
    time: null,
};

const initialSessionState = {
    lastedLaps: 0,
    host: null,
    sessionType: null,
    track: null,
    bestLap: null,
    leaderboard: [],
    ledMostLaps: null,
    winner: null,
};

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
                                            ...initialSessionState,
                                            lastedLaps: getLapCount(session),
                                            host: session.serverName,
                                            sessionType: session.sessionType,
                                            track: session.trackName,
                                            bestLap: {
                                                ...initialLapState,
                                                ...getBestLap(session),
                                            },
                                            winner: getRaceWinner(session),
                                            leaderboard: [
                                                ...getSessionLeaderboard(session),
                                            ],
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
    return state.Results;
};

export const getResultsBySession = (state, eventId, sessionType) => {
    const event = getState(state).sessions[eventId];
    return event && event[sessionType];
};
//#endregion

//#region Actions
//#endregion