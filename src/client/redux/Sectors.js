import { EVENT as SOCKET_EVENT } from '../utils/socketMiddleware';
import { getEventKey } from '../helpers/events';
import { getBestSectors } from '../helpers/sectors';

//#region Action
const ns = 'ACC/SECTORS/';
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
                                        [session.sessionType]: getBestSectors(session),
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
    return state.Sectors;
};

export const getSectorsBySession = (state, eventId, sessionType) => {
    const event = getState(state).sessions[eventId];
    return event && event[sessionType];
};
//#endregion

//#region Actions
//#endregion