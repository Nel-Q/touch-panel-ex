import React from 'react';
import CrComLib from "@crestron/ch5-crcomlib";
import Header from './Header';
import './StartPage.css'

function StartPage({ onInitialPageClick }) {
  const handleClick = (event) => {
    if (!event.target.classList.contains('startText')) {
      // Trigger the click event for the initial page
      onInitialPageClick();
      CrComLib.CrComLib.publishEvent('b','1', true);
      console.log("Signal sent to processor");
    }
  };
  const classRoom = CrComLib.CrComLib.subscribeState('s','1', true);
  console.log(typeof(classRoom))

  return (
    <div onClick={handleClick} className="StartPage">
        <Header/>
        <div className="schoolText">Northwestern</div>
        <div className="classNumber">{classRoom}</div>
        <div className="startText">Touch Screen to Start</div>
    </div>
  );
}

export default StartPage;
