
export enum BackgroundActionTypes {

    SET_CURRENT_TAB = '@@Background/SET_CURRENT_TAB',
    
    // Those 2 actions concern only the debug feature
    ATTACH_DEBUGGER = '@@Background/ATTACH_DEBUGGER',
    RAPLACE_UXA = '@@Background/REPLACE_UXA',

    SET_UXA_ON = '@@Background/SET_UXA_ON',
    
    ADD_TAG_API_REQUEST = '@@Background/ADD_TAG_API_REQUEST',
    
    GET_COOKIES= '@@Background/GET_COOKIES',
    SET_COOKIES= '@@Background/SET_COOKIES'
}
