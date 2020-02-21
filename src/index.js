import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import initialState from './initialState.js';
import reducer from './reducers';

const store = createStore(reducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);