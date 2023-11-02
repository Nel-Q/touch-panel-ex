import * as CrComLib from "@crestron/ch5-crcomlib";
import { useCrestronSubscribeSerial, useCrestronPublishDigital} from "@norgate-av/react-crestron-ch5-hooks";
import './Header.css'

function Header() {
    const [classRoom] = useCrestronSubscribeSerial('1');
    return(
        <div className="Header">
            <ch5-datetime 
                displaytype="date" 
                styleForDate="MMMM d, yyyy"></ch5-datetime>
                <p>{classRoom.value}</p>
            <ch5-datetime 
                displaytype="time"></ch5-datetime>

        </div>
    );
}


export default Header;