import * as CrComLib from "@crestron/ch5-crcomlib";
import './Header.css'

function Header() {

    return(
        <div className="Header">
            <ch5-datetime 
                displaytype="date" 
                styleForDate="MMMM d, yyyy"></ch5-datetime>
            <ch5-datetime 
                displaytype="time"></ch5-datetime>

        </div>
    );
}


export default Header;