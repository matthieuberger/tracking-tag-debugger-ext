import { SharedActionTypes } from './constants';
import { ICSConf } from './types';

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

export type SharedActionType = SetTagConf | GetCookies;
