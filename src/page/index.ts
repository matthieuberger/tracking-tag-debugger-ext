import { ICSConf } from '../shared/types';
import { REDUX_PORT_NAME, CS_CONFIG } from "../shared/constants";

interface CSWindow extends Window {
  CS_CONF: ICSConf;
}

// typing window object
var csWindow = <CSWindow>window;

function checkCSConfig() {
  if(csWindow.CS_CONF) {
    window.postMessage({ type: CS_CONFIG, config: JSON.stringify(csWindow.CS_CONF) }, "*");
    return;
  }
  setTimeout(checkCSConfig, 1000);

}

checkCSConfig();
