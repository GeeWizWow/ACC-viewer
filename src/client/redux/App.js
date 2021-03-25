
//#region Action
const ns = 'ACC/APP/';
const INIT = ns + 'INIT';
//#endregion

//#region Reducer
const initialState = {
    init: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case INIT: {
            return state;
        }

        default: {
            return state;
        }
    }
}
//#endregion

//#region Selectors
const getState = (state) => {
    return state.App;
};

const getIsInit = (state) => {
    return getState(state).init;
};
//#endregion

//#region Actions
//#endregion