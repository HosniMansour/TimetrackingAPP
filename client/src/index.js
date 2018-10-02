import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk'

import taskReducer from "./reducers/taskReducer";

const root = combineReducers({
    tsk: taskReducer
});

let store = createStore(root,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);