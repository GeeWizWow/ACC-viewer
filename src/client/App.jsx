import React from 'react';
import Master from './views/master/Master';
import { Grommet, grommet } from 'grommet';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import configureStore from './store/configureStore';

const store = configureStore();

const GrommetProps = {
    full: true,
    themeMode: 'light',
    theme: {
        global: {
            font: {
                family: 'Roboto',
                // size: '4px',
                // height: '20px',
            },
        },
        table: {
            header: {
                background: 'light-1',
            },
        },
    },
    // theme: grommet
};

export default () => (
    <Provider store={store}>
        <BrowserRouter>
            <Grommet {...GrommetProps}>
                <Master />
            </Grommet>
        </BrowserRouter>
    </Provider>
);
