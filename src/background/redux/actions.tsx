import { BackgroundActionTypes } from './constants';
import {ICookie} from '../../shared/types';

interface AttachDebugger{
  type: typeof BackgroundActionTypes.ATTACH_DEBUGGER;
}

export function attachDebugger() {
  return {
    type: BackgroundActionTypes.ATTACH_DEBUGGER
  }
};

interface SetUxaOn {
  type: typeof BackgroundActionTypes.SET_UXA_ON;
  tabId: number;
  url: string;
}

export function setUxaOn(tId: number, u: string) {
  return {
   type: BackgroundActionTypes.SET_UXA_ON,
   tabId: tId,
   url: u
  }
};

interface AddTagApiRequest {
  type: typeof BackgroundActionTypes.ADD_TAG_API_REQUEST;
  tabId: number;
  timeStamp: number;
  url: string;
}

export function addTagApiRequest(tId: number, ts: number, u: string) {
  return {
   type: BackgroundActionTypes.ADD_TAG_API_REQUEST,
   tabId: tId,
	 timeStamp: ts,
   url: u
  }
};

interface GetCookies{
  type: typeof BackgroundActionTypes.GET_COOKIES;
}

export function getCookies() {
  return {
    type: BackgroundActionTypes.GET_COOKIES
  }
};

interface SetCookies{
  type: typeof BackgroundActionTypes.SET_COOKIES;
  cookies: ICookie[];
}

export function setCookies(cookies: ICookie[]) {
  return {
    type: BackgroundActionTypes.SET_COOKIES,
    cookies: cookies
  }
};


interface SetCurrentTab {
  type: typeof BackgroundActionTypes.SET_CURRENT_TAB;
  tabId: number;
  domain: string;
}

export function setCurrentTab(tabId: number, hostname: string) {
  return {
    type: BackgroundActionTypes.SET_CURRENT_TAB,
    tabId: tabId,
    domain: hostname
  }
};



export type ActionType = AttachDebugger | SetUxaOn | SetCurrentTab | GetCookies | SetCookies | AddTagApiRequest;
