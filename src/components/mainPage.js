import * as React from 'react';
import CrComLib from "@crestron/ch5-crcomlib";
import Header from './Header';
import './mainPage.css'
import LaptopIcon from '@mui/icons-material/Laptop';
import Button from '@mui/material/Button';
import TabletMacOutlinedIcon from '@mui/icons-material/TabletMacOutlined';
import { useState } from "react";
import Footer from './Footer';

function MainPage() {
    const [inputSelected, setInputSelected] = useState('');
    
    const handleInputSelected =(joinNumber) => {
        if (joinNumber !== inputSelected) {
            if (inputSelected === ''){
                setInputSelected(joinNumber);
                window.CrComLib.publishEvent('b', joinNumber, true);
                console.log("signal sent to join number:" + `${joinNumber}`)
            } else {
                window.CrComLib.publishEvent('b', joinNumber, false);
                setInputSelected(joinNumber);
                window.CrComLib.publishEvent('b', joinNumber, true);
                console.log("signal sent to join number:" + `${joinNumber}`)
            }
        }
        
    }
    return(
        <div className="mainPage">
            <Header />
            <main>
                <Button className="input" onClick={() => handleInputSelected('12')} variant='container' color='primary' >
                    <LaptopIcon sx={{fontSize:150}} className='icon' style={{ marginRight: 8 }}/>
                    <p className='title'>Laptop</p>
                </Button>
                <Button className='input' onClick={() => handleInputSelected('13')} variant='container' color='primary'>
                    <TabletMacOutlinedIcon sx={{fontSize:150}}  className='icon' style={{ marginRight: 8 }}/>
                    <p className='title'>Wireless</p>
                </Button>
            </main>
            <Footer />
        </div>
    )
}

export default MainPage;