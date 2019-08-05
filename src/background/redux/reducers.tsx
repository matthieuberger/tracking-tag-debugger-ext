import { getCookies, updateBadge } from '../browser';
import { hashRequest, parseUrlAndCookies } from '../utils';

import { ActionType } from './actions';
import { BackgroundActionTypes } from './constants';
import { ITagState } from '../../shared/types';
import { SharedActionTypes } from '../../shared/constants';

const initialState: ITagState = {
  currentTabId: null,
  currentUrl: null,
  tabs: null
};

export function backgroundReducer(state: ITagState = initialState, action: ActionType) {
  var tabId = state.currentTabId;
  switch(action.type) {

    case BackgroundActionTypes.ATTACH_DEBUGGER:
      break;

    case BackgroundActionTypes.SET_UXA_ON:
      state[action.tabId].hasTag = true;

      // TODO: Create Update badge action for redux
      updateBadge(true);
      break;

    case BackgroundActionTypes.GET_COOKIES:
      if (state.currentUrl) {
        getCookies(state.currentUrl);
      }
      break

    case BackgroundActionTypes.SET_COOKIES:
      tabId = state.currentTabId;
      state = {...state, tabs: {...state.tabs, [tabId]: 
        {...state.tabs[tabId], cookies: action.cookies}}};
      break

    case BackgroundActionTypes.SET_CURRENT_TAB:
      tabId = action.tabId;
      state = {...state, currentTabId: tabId, currentUrl: action.domain};
      state = state[tabId] ? state : {...state, tabs: {...state.tabs,
        [tabId]:{hasTag: false, uxaUrl: null, requests: {}, tagConfig: null, cookies: [] }
      }};
      // TODO: Create Update badge action for redux
      // Dispatch update badge action
      break;

    case BackgroundActionTypes.ADD_TAG_API_REQUEST:
      const uId = hashRequest(action.tabId, action.timeStamp, action.url);
      const newRequest = parseUrlAndCookies(action.url, action.timeStamp);
      state = {...state, tabs: {...state.tabs, [action.tabId]:
        {...state.tabs[action.tabId], requests: {...state.tabs[action.tabId].requests, [uId]: newRequest}}
      }};
      break

    // Shared ActionTypes
    case SharedActionTypes.SET_TAG_CONF:
      if(tabId)
        state = {...state, tabs: {...state.tabs, [tabId]: {...state.tabs[tabId],
          tagConfig: action.config, hasTag: true}
        }};
      break

    case SharedActionTypes.GET_COOKIES:
      if (state.currentUrl) {
        getCookies(state.currentUrl);
      }
      break
  }

  return state
}
