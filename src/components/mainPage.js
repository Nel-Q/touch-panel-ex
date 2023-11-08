import * as React from 'react';
import * as CrComLib from "@crestron/ch5-crcomlib";
import Header from './Header';
import './mainPage.css'
import LaptopIcon from '@mui/icons-material/Laptop';
import Button from '@mui/material/Button';
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined';
import { useState } from "react";
import { useCrestronPublishDigital } from "@norgate-av/react-crestron-ch5-hooks";
import Footer from './Footer';

function MainPage() {
    const [inputSelected, setInputSelected] = useState('');
    const [LaptopSignal] = useCrestronPublishDigital('12');
    const [wirelessSignal] = useCrestronPublishDigital('12');
    
    const handleInputSelected =(joinNumber) => {
        if (joinNumber !== inputSelected) {
            if (inputSelected === ''){
                setInputSelected(joinNumber);
                CrComLib.publishEvent('b', joinNumber, true);
                console.log("signal sent to join number:" + `${joinNumber}`)
            } else {
                CrComLib.publishEvent('b', inputSelected, false);
                setInputSelected(joinNumber);
                CrComLib.publishEvent('b', joinNumber, true);
                console.log("signal sent to join number:" + `${joinNumber}`)
            }
        }
        
    }
    return(
        <div className="mainPage">
            <Header />
            <main>
                <Button className="input"  variant='container' color='primary' 
                    onTouchStart={() => LaptopSignal.setValue(true)}
                    onTouchEnd={() => LaptopSignal.setValue(true)}>
                    <LaptopIcon sx={{fontSize:150}} className='icon' style={{ marginRight: 8 }}/>
                    <p className='title'>Laptop</p>
                </Button>
                <Button className='input' variant='container' color='primary'
                    onTouchStart={() => wirelessSignal.setValue(true)}
                    onTouchEnd={() => wirelessSignal.setValue(true)}>
                    <TabletMacOutlinedIcon sx={{fontSize:150}}  className='icon' style={{ marginRight: 8 }}/>
                    <p className='title'>Wireless</p>
                </Button>
            </main>
            <Footer />
        </div>
    )
}

export default MainPage;