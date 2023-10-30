import * as CrComLib from "@crestron/ch5-crcomlib";
import './Header.css'

function Header() {
    const roomName = CrComLib.subscribeState('s','1', true )
    return(
        <div className="Header">
            <ch5-datetime 
                displaytype="date" 
                styleForDate="MMMM d, yyyy"></ch5-datetime>
            <p>{roomName}</p>
            <ch5-datetime 
                displaytype="time"></ch5-datetime>

        </div>
    );
}


export default Header;