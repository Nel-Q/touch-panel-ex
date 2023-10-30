import './App.css';
import Header from './components/Header';
import React, { useEffect, useState } from 'react';
import * as CrComLib from "@crestron/ch5-crcomlib";
import MainPage from './components/mainPage';
import StartPage from './components/StartPage';

window ["bridgeReceiveIntegerFromNative"] = 
  CrComLib.bridgeReceiveIntegerFromNative;
window ["bridgeReceiveBooleanFromNative"] = 
  CrComLib.bridgeReceiveBooleanFromNative;
window ["bridgeReceiveStringFromNative"] = 
  CrComLib.bridgeReceiveStringFromNative;
window ["bridgeReceiveObjectFromNative"] = 
  CrComLib.bridgeReceiveObjectFromNative;
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
