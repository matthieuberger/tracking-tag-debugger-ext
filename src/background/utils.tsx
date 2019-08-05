const sha1 = require('sha1');
import { ITagRequest, IKeyValue  } from '../shared/types';

export function hashRequest(tabId: number, timeStamp: number, url:string): string {
  const strToHash: string = tabId.toString() + timeStamp.toString() + url;
  return sha1(strToHash);
}

export function parseUrlAndCookies(u: string, timeStamp: number): ITagRequest {
  const url = new URL(u);
  let params: IKeyValue[] = [];
	url.searchParams.forEach((v, k) => {
    params.push({name:k,value:v});
	});

  return {
    type: url.pathname,
    timeStamp: timeStamp,
    url: u,
    params: params
  };
}
