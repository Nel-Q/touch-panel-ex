import React from 'react';
import * as CrComLib from "@crestron/ch5-crcomlib";
import Header from './Header';
import './StartPage.css'

function StartPage({ onInitialPageClick }) {
  const roomName = CrComLib.subscribeState('s','1', true )
  const handleClick = (event) => {
    if (!event.target.classList.contains('startText')) {
      // Trigger the click event for the initial page
      onInitialPageClick();
      CrComLib.publishEvent('b','1', true);
      CrComLib.publishEvent('b','1', false);
      console.log("Signal sent to processor");
    }
  };

  return (
    <div onClick={handleClick} className="StartPage">
        <Header/>
        <div className="schoolText">Northwestern</div>
        <div className="classNumber">{roomName}</div>
        <div className="startText">Touch Screen to Start</div>
    </div>
  );
}

export default StartPage;
