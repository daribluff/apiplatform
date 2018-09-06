import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import registerServiceWorker from './registerServiceWorker';
// Import your reducers and routes here
import Welcome from './Welcome';
import book from './reducers/book/';
import bookRoutes from './routes/book';

const store = createStore(
  combineReducers({routing, form, book}),
  applyMiddleware(thunk),
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

registerServiceWorker();
