import * as browser from './browser';

import { REDUX_PORT_NAME } from "../shared/constants";
import {getCookies} from './redux/actions';
import store from './redux/store';
import { wrapStore } from 'webext-redux';

// Initialize store
wrapStore(store, {
  portName: REDUX_PORT_NAME
});

// Get Active Tab
browser.listenTabChange();
// browser.getActiveTab();

// Set up listeners
browser.listenForUXA(() => {
  store.dispatch(getCookies());
  browser.listenApiCall();
});


//Update badge
browser.updateBadge(false);



