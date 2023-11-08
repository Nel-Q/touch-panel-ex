import * as CrComLib from "@crestron/ch5-crcomlib";
import {
  bridgeReceiveIntegerFromNative,
  bridgeReceiveBooleanFromNative,
  bridgeReceiveStringFromNative,
  bridgeReceiveObjectFromNative,
} from "@crestron/ch5-crcomlib";
import './App.css';
import React, { useEffect, useState } from 'react';
import MainPage from './components/mainPage';
import StartPage from './components/StartPage';
import WebXPanel from "@crestron/ch5-webxpanel"; 

// 
// window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative;
// window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative;
// window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative;
// window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative;
window.CrComLib = CrComLib;
window.bridgeReceiveIntegerFromNative = bridgeReceiveIntegerFromNative; 
window.bridgeReceiveBooleanFromNative = bridgeReceiveBooleanFromNative;
window.bridgeReceiveStringFromNative = bridgeReceiveStringFromNative;
window.bridgeReceiveObjectFromNative = bridgeReceiveObjectFromNative;
// Initialize the WebSocket when the application starts
const configuration = {
  host: '192.105.110.238', // defaults to window.location.host
  ipId: '4', // string representing a hex value. Might contain "0x" or not. Defaults to "0x03"
  
};
if (WebXPanel.isActive) {
  WebXPanel.default.initialize(configuration);
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