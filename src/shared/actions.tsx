import { ICSConf, ICookie } from './types';

import { SharedActionTypes } from './constants';

// Set Tag Conf
export interface SetTagConf {
  type: typeof SharedActionTypes.SET_TAG_CONF;
  config: ICSConf;
}

export function setTagConf(conf: ICSConf) {
  return {
    type: SharedActionTypes.SET_TAG_CONF,
    config: conf,
  }
};

export interface GetCookies {
  type: typeof SharedActionTypes.GET_COOKIES;
}

export function getCookies() {
  return {
    type: SharedActionTypes.GET_COOKIES
  }
}

export interface UpdateCookie {
  type: typeof SharedActionTypes.UPDATE_COOKIE;
  cookie: ICookie;
}

export function updateCookie(cookie: ICookie) {
  return {
    type: SharedActionTypes.UPDATE_COOKIE,
    cookie: cookie
  }
}

export interface RemoveCookie {
  type: typeof SharedActionTypes.REMOVE_COOKIE;
  cookie: ICookie;
}

export function removeCookie(cookie: ICookie) {
  return {
    type: SharedActionTypes.REMOVE_COOKIE,
    cookie: cookie
  }
}

export type ActionType = SetTagConf | GetCookies | UpdateCookie | RemoveCookie;
