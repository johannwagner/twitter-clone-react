import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import promise from "redux-promise-middleware"
import logger from "redux-logger"

import {Provider} from "react-redux"
import authenticationReducer from "./Reducers/authenticationReducer";
import tweetsReducer from "./Reducers/tweetsReducer";
import emoteReducer from "./Reducers/emoteReducer";

let reducers  = combineReducers({ authentication: authenticationReducer, tweets: tweetsReducer, emotes: emoteReducer});

let store = createStore(reducers, applyMiddleware(logger, promise()));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
