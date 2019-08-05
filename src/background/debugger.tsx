export function attachDebugger(tabId:number, callback=null) {
    // console.log("Debugger");
    // chrome.debugger.getTargets((targets) => {
    //   var tab = targets.find((t) => {return t.tabId===tabId});
    //   console.log(tab);
    //   if (!tab.attached) {
    //     console.log("ATTACHING DEBUGGER");
    //     chrome.debugger.attach({ tabId: tabId }, "1.2", () => {
    //       activateNetworkForDebugger(tabId, callback);
    //     });
    //   } else {
    //     activateNetworkForDebugger(tabId, callback);
    //   }
    // });
    chrome.debugger.attach({ tabId: tabId }, "1.2", () => {
      activateNetworkForDebugger(tabId, callback);
    });
  }
  
interface IParams {
    type: string;
    requestId: string;
    response: { url: string};
  }

export function activateNetworkForDebugger(tabId:number, callback=null) {
    console.log("Enabling network debugger for tab: " + tabId);
  
    chrome.debugger.sendCommand({ tabId:tabId }, "Network.enable", () => {
      chrome.debugger.onEvent.addListener((source, message, params: IParams) => {
  
        var filter = /https:\/\/t.contentsquare.net\/uxa\/([0-9a-z]+).js$/g;
        if (message === "Network.responseReceived" && params.type === "Script" 
          && params.response && filter.test(params.response.url)) {
            interceptUxa(tabId, params.requestId)
        }
      });
  
      // Execute callback
      if (callback) {
        callback();
      }
      
    });
  }
  
  function interceptUxa(tabId: number, requestId: string) {
    chrome.debugger.sendCommand(
      {tabId: tabId}, "Network.getResponseBody", 
      { "requestId": requestId }, 
      (response) => {
        console.log("Intercept UXA");
        console.log(response);
      }
    );
  }