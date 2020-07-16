import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './app';

const targetElement = document.getElementById('app');

if (process.env.NODE_ENV !== 'production' && module.hot) {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        targetElement
    );

    module.hot.accept('./app', () => {
        let NextAppAssignments = require('./app').App;

        ReactDOM.render(
            <AppContainer>
                <NextAppAssignments />
            </AppContainer>,
            targetElement
        );
    });
} else {
    ReactDOM.render(
        <App />,
        targetElement
    );
}
