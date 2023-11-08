import React from 'react';
import * as CrComLib from "@crestron/ch5-crcomlib";
import Header from './Header';
import { useCrestronSubscribeSerial, useCrestronPublishDigital} from "@norgate-av/react-crestron-ch5-hooks";
import './StartPage.css'

function StartPage({ onInitialPageClick }) {
  const [startSignal] = useCrestronPublishDigital('1');
  const [classRoom] = useCrestronSubscribeSerial('1');
  const handleClick = (event) => {
    if (!event.target.classList.contains('startText')) {
      // Trigger the click event for the initial page
      onInitialPageClick();
      startSignal.setValue(true);
      console.log("Signal sent to processor");
    }
  };
  
  console.log(typeof(classRoom.value))

  return (
    <div onClick={handleClick} className="StartPage">
        <Header/>
        <div className="schoolText">Northwestern</div>
        <div className="classNumber">{classRoom.value}</div>
        <div className="startText">Touch Screen to Start</div>
    </div>
  );
}

export default StartPage;
