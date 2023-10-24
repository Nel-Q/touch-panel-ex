import * as React from 'react';
import * as CrComLib from "@crestron/ch5-crcomlib";
import Header from './Header';
import './mainPage.css'
import LaptopIcon from '@mui/icons-material/Laptop';
import Button from '@mui/material/Button';
import { useState } from "react";
import Footer from './Footer';

function MainPage() {
    const [inputSelected, setInputSelected] = useState('');
    const laptopSelected = () => {
        setInputSelected('laptop')
        CrComLib.publishEvent("b", 12, true);
        console.log('laptop selected')
    }
    return(
        <div className="mainPage">
            <Header />
            <main>
                
                <Button className="laptop" onClick={laptopSelected} variant='container' color='primary' >
                    <LaptopIcon fontSize='large' className='icon' style={{ marginRight: 8 }}/>
                    <p className='title'>Laptop</p>
                </Button>
            </main>
            <Footer />
        </div>
    )
}

export default MainPage;