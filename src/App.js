import CrComLib from "@crestron/ch5-crcomlib";
import './App.css';
import React, { useEffect, useState } from 'react';
import MainPage from './components/mainPage';
import StartPage from './components/StartPage';
import { getWebXPanel, runsInContainerApp } from '@crestron/ch5-webxpanel'; 

window.bridgeReceiveIntegerFromNative = CrComLib.CrComLib.bridgeReceiveIntegerFromNative; 
window.bridgeReceiveBooleanFromNative = CrComLib.CrComLib.bridgeReceiveBooleanFromNative;
window.bridgeReceiveStringFromNative = CrComLib.CrComLib.bridgeReceiveStringFromNative;
window.bridgeReceiveObjectFromNative = CrComLib.CrComLib.bridgeReceiveObjectFromNative;
window.CrComLib = CrComLib.CrComLib;
// Initialize the WebSocket when the application starts

const { WebXPanel, isActive, WebXPanelConfigParams, WebXPanelEvents } = getWebXPanel(!runsInContainerApp());
if (WebXPanel.isActive) {
  WebXPanelConfigParams.host = '192.105.110.238';
  WebXPanelConfigParams.ipId = "4";
  // Removed the port = 41794, because that is not the websocket port
  WebXPanel.initialize(WebXPanelConfigParams);
}

function App() {
  const [initialPageClicked, setInitialPageClicked] = useState(false);

  const handleInitialPageClick = () => {
    setInitialPageClicked(true);
  }
  
  return (
    <div className="App">
      {!initialPageClicked ? (<StartPage onInitialPageClick={handleInitialPageClick} />) : 
        (<MainPage />)}

    </div>
  );
}

export default App;
