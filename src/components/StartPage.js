import CrComLib from "@crestron/ch5-crcomlib";
import Header from './Header';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css'

function StartPage({}) {
  const navigate = useNavigate();
  const [classRoom, setClassRoom] = useState("");
  useEffect(() =>{
    window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
  }, [])
  const handleClick = () => {
      window.CrComLib.publishEvent('b','1', true);
      window.CrComLib.publishEvent('b','1', false);
      console.log("Signal sent to processor");
      navigate('/mainPage')
    };


  return (
    <div className="StartPage" onClick={handleClick}>
      <Header/>
      <div className="schoolText">Northwestern</div>
      <div className="classNumber">{classRoom}</div>
      <div className="startText">Touch Screen to Start</div>
        
    </div>
  );
};

export default StartPage;
