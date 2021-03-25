
//#region Action
const ns = 'ACC/APP/';
const INIT = ns + 'INIT';
const TOGGLE_THEME = ns + 'TOGGLE_THEME';
//#endregion

//#region Reducer
const initialState = {
    init: false,
    theme: localStorage.theme,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case INIT: {
            return state;
        }

        case TOGGLE_THEME: {
            return {
                ...state,
                theme: state.theme === 'dark' ? 'light' : 'dark',
            };
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

export const getTheme = (state) => {
    return getState(state).theme;
};
//#endregion

//#region Actions
export const toggleTheme = () => {
    return (dispatch, getState) => {
        const theme = getTheme(getState());
        localStorage.theme = theme === 'dark' ? 'light' : 'dark';
        return dispatch({
            type: TOGGLE_THEME,
        });
    };
}
//#endregion