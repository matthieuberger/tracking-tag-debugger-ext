export interface IKeyValue {
	name: string;
	value: any;
}

export interface ITagRequest {
	type: string;
	timeStamp: number;
	url: string;
	params: IKeyValue[];
}


export interface ITabData {
	hasTag: boolean;
	uxaUrl: string;
	tagConfig: ICSConf;
	requests: { [uid:string]: ITagRequest; }
	cookies: ICookie[];
}

export interface ICookie {
	domain: string;
	expirationDate: number;
	hostOnly: boolean;
	httpOnly: boolean;
	name: string;
	path: string;
	sameSite: string;
	secure: boolean;
	session: boolean;
	storeId: string;
	value: string;
}

export interface ITagState {
	currentTabId: number;
  	currentUrl: string;
	tabs: { [index: number]: ITabData; }
} 

export interface ICSConf {
	projectId: number;
	status: number;
	hostnames: string[];
	crossDomainTracking: number;
	consentRequired: number;
	collectHtml: number;
	allowSubdomains: number;
	visitorCookieTimeout: number;
	sampleRate: number;
	recordingRate: number;
	replayRecordingRate: number;
	validationRate: number;
	jquery: boolean;
	lastTrackingDraw?: any;
	trackerDomain: string;
	recordingDomain: string;
	ed: string;
	eMerchandisingEnabled: number;
	eMerchandisingDomain: string;
	triggerSessionReplayEnabled: number;
	triggerSessionReplayRegex?: any;
	dynamicIdRegex?: any;
}
