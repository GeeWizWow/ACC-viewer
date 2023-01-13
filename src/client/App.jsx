import React from 'react';
import Master from './views/master/Master';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import configureStore from './store/configureStore';

const store = configureStore();

export default () => {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Master />
            </BrowserRouter>
        </Provider>
    );
};
