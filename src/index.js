import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from "react-redux";
import Thunk from 'redux-thunk';
import Logger from 'redux-logger';
import ReactDom from 'react-dom';
import App from './components/app';
import RootReducer from './reducers';
import {actionTypes} from './actions/fetch_actions';

var initialFetchState = {}
initialFetchState[actionTypes.FETCHING_CHARITIES] = false;

const initialState = {'fetchStatus': initialFetchState}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer,initialState, composeEnhancers(applyMiddleware(Thunk, Logger)));

const Root = ()=> {
    return (
    <Provider store={store}>
        <App />
    </Provider>
    )
}

ReactDom.render(<Root/>, document.getElementById("root"));