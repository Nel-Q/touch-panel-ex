import * as CrComLib from "@crestron/ch5-crcomlib";
import './Footer.css'
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import VolumeOffSharpIcon from '@mui/icons-material/VolumeOffSharp';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import { useState } from "react";
import { useCrestronSubscribeAnalog, useCrestronSubscribeSerial, useCrestronPublishDigital, useCrestronPublishAnalog } from "@norgate-av/react-crestron-ch5-hooks";

function Footer() {
    const [initialVolume] = useCrestronSubscribeAnalog('1');
    const [isMuted, setIsMuted] = useState(false);
    const [sliderValue, setSliderValue] = useState(initialVolume.value);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [muteSignal] = useCrestronPublishDigital('20');
    const [shutSignal] = useCrestronPublishDigital('30');
    const [volumePlusSignal] = useCrestronPublishDigital('22');
    const [volumeMinSignal] = useCrestronPublishDigital('21');


    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const programShutOff = () => {
        closeModal()
        shutSignal.setValue(true);
        window.location.href = '/StartPage.js'
        console.log("program shut off")
    }
    const increaseVolume = () => {
        setSliderValue((prevValue) => prevValue + 1);
        volumePlusSignal.setValue(true);
        console.log('volume increased')

    }
    const decreaseVolume = () => {
        setSliderValue((prevValue) => prevValue - 1);
        volumeMinSignal.setValue(true)
        console.log('volume decreased')
    }
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        
      };
    
    const toggleMute = () => {
        setIsMuted((prevIsMuted) => !(prevIsMuted));
        if (isMuted) {
            muteSignal.setValue(false);
            console.log('program unmuted')
        } else{
            muteSignal.setValue(true);
            console.log('program muted')
        }
    }
    return(
        <div className="Footer">
            <Button onClick={openModal} color="error" size="large">
                <PowerSettingsNewIcon fontSize="large" color="red" />
            </Button>
            <Dialog open={isModalOpen} onClose={closeModal}>
                <DialogTitle>Turn Off System</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                     Do you want to go back to the previous page or turn off the system?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Go Back
                    </Button>
                    <Button onClick={programShutOff} color="secondary">
                        Turn Off
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="PgmVolumeContainer">
                <p>Volume</p>
                <div className="PgmVolume">
                    <Button onClick={toggleMute}>
                        {isMuted ?<VolumeOffSharpIcon/> : <VolumeOffOutlinedIcon />}
                    </Button>
                    <Button 
                        onTouchStart={decreaseVolume}
                        onTouchEnd={() => volumeMinSignal.setValue(false)}>
                        <RemoveIcon />
                    </Button>
                    <Slider 
                        sx={{width:80}}
                        value={sliderValue}
                        onChange={handleSliderChange}/>
                        
                    <Button 
                        onTouchStart={increaseVolume}
                        onTouchEnd={() => volumePlusSignal.setValue(false)}>
                        <AddIcon />
                    </Button>
                </div>
            </div>

        </div>
    );
}


export default Footer;