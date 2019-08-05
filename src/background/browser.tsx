import * as actions from './redux/actions';

import { ICookie } from '../shared/types';
import store from './redux/store';

export function updateBadge(enabled) {
  if (enabled) {
    chrome.browserAction.setBadgeText({
      text: "ON"
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: "#15a341"
    });
  } else {
    chrome.browserAction.setBadgeText({
      text: "OFF"
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: "#7e2013"
    });
  }
}


export function listenTabChange(callback=null) {
  // Handle the chrome tab change
  chrome.tabs.onActivated.addListener(() => {
    // Get Current Trab
    getCurrentTab();

    // Execute callback
    if (callback) {
      callback();
    }
  });
}


export function listenForUXA(callback=null) {
  const filters = {urls: ["*://t.contentsquare.net/uxa/*.js"]};
  // Handling UXA request. Waiting for onResponseStarted to make sure it'
  chrome.webRequest.onResponseStarted.addListener(
    function(details) {
      store.dispatch(actions.setUxaOn(details.tabId, details.url));
      // Execute callback
      if (callback) {
        callback();
      }
    }, 
    filters
  );
}

export function listenApiCall() {
  const filters = {urls: ["*://c.contentsquare.net/*", "*://c.contentsquare.com/*"]};
  chrome.webRequest.onResponseStarted.addListener(
    function(details) {
      store.dispatch(actions.addTagApiRequest(details.tabId, details.timeStamp, details.url));
      return {};
    },
    filters
  );
}

/**
 * Get current opened tab in browser and dispatch the proper action to redux
 */
export function getCurrentTab() {
  chrome.tabs.getSelected(null, (tab) => {
    store.dispatch(actions.setCurrentTab(tab.id, tab.url));
  });
}
/**
 * Get all cookies for a specific url. Filter them to only get the contentsqaure cookies
 * @param  {string} url
 */
export function getCookies(url: string) {
  chrome.cookies.getAll({url: url}, function(cookies: ICookie[]) {
    const filtered = Array.from(cookies.filter(cookie => cookie.name.includes("_cs")));
    store.dispatch(actions.setCookies(filtered));
  });
}

/**
 * Delete cookie
 * @param  {string} url
 * @param  {ICookie} cookie
 * @param  {function(deleted: boolean)} callback
 */
export function deleteCookie(url: string, cookie: ICookie, callback=null) {
  chrome.cookies.remove({
      'url': url,
      'name': cookie.name,
      'storeId': cookie.storeId
  }, (details) => {
      if (callback && (details===undefined || typeof details==="undefined")){
        callback(false);
      } else if (callback) {
        callback(true);
      }
  });
}

/**
 * Update cookie. To update a cookie we delete the previous existing 
 * cookie and then set a new one
 * 
 * @param  {string} url
 * @param  {ICookie} cookie
 * @param  {function(deleted: boolean)} callback
 */
export function updateCookie(url: string, cookie: ICookie, callback=null) {
  
  // Removing uneeded fields
  delete cookie.hostOnly;
  delete cookie.session;

  deleteCookie(url, cookie, (success) => {
    if (success) {
      chrome.cookies.set({...cookie, url: url}, (cookie: ICookie) => {
        if (callback && (cookie===undefined || typeof cookie==="undefined")){
          callback(false);
        } else if (callback) {
          callback(true);
        }
      });
    } else if (callback) {
      // Execute callback with failure
      callback(false);
    }
  });
}



