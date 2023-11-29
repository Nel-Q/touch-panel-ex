import CrComLib from "@crestron/ch5-crcomlib";
import React, { useEffect, useState } from 'react';
import './Header.css'

function Header() {
    const [classRoom, setClassRoom] = useState("");
    useEffect(() =>{
    window.CrComLib.subscribeState('s','1', value=> setClassRoom(value));
  }, [])
    // const roomName = CrComLib.CrComLib.subscribeState('s','1', true )
    return(
        <div className="Header">
            <ch5-datetime 
                displaytype="date" 
                styleForDate="MMMM d, yyyy"></ch5-datetime>
                <p>{classRoom}</p>
            <ch5-datetime 
                displaytype="time"></ch5-datetime>

        </div>
    );
}


export default Header;