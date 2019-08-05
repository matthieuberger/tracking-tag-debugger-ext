import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Store, applyMiddleware } from 'webext-redux';
import App from './App';
import { REDUX_PORT_NAME } from "../shared/constants";


const store = new Store({portName: REDUX_PORT_NAME});
// Apply middleware to proxy store
const middleware = [thunkMiddleware];
const proxyStore = applyMiddleware(store, ...middleware);

// wait for the store to connect to the background page
proxyStore.ready().then(() => {
  // The store implements the same interface as Redux's store
  // so you can use tools like `react-redux` no problem!
  ReactDOM.render(
    <Provider store={proxyStore}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
    , document.getElementById('root'));
});
