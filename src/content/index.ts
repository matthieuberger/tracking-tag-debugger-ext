import { Store } from 'webext-redux';
import { setTagConf } from '../shared/actions';
import { CS_CONFIG , REDUX_PORT_NAME } from '../shared/constants';

const store = new Store({portName: REDUX_PORT_NAME});

function injectScript(filePath) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  document.body.appendChild(script);
}

// Inject our page script at the end of the DOM
injectScript(chrome.extension.getURL('js/page.js'));

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type === CS_CONFIG )) {
    console.log(event.data);
    let config = JSON.parse(event.data.config);
    store.dispatch(setTagConf(config));
  }
}, false);
