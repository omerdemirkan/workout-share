import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import createReducer from './store/reducers/create'
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
    create: createReducer,
    auth: authReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
