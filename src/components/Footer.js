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

function Footer() {
    const [isMuted, setIsMuted] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const initialValue = CrComLib.subscribeState('n','1', true);
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const programShutOff = () => {
        closeModal();
        window.location.href = './startPage.js';
        CrComLib.publishEvent('b', '30', true);
        console.log("program shut off")
    }
    const increaseVolume = () => {
        setSliderValue((prevValue) => prevValue + 1);
        CrComLib.publishEvent('b', '22', true);
        // CrComLib.publishEvent("b", "22", false);
        console.log('volume increased')

    }
    const decreaseVolume = () => {
        setSliderValue((prevValue) => prevValue - 1);
        CrComLib.publishEvent('b', '21', true);
        // CrComLib.publishEvent("b", "21", false);
        console.log('volume decreased')
    }
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        
      };
    
    const toggleMute = () => {
        setIsMuted((prevIsMuted) => !(prevIsMuted));
        if (isMuted) {
            CrComLib.publishEvent('b', '20', false);
            console.log('program unmuted')
        } else{
            CrComLib.publishEvent('b', '20', true);
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
                    <Button onClick={decreaseVolume} fontSize="large">
                        <RemoveIcon />
                    </Button>
                    <Slider 
                        sx={{width:100}}
                        value={() => setSliderValue(initialValue)}
                        onChange={handleSliderChange}/>
                        
                    <Button onClick={increaseVolume}>
                        <AddIcon />
                    </Button>
                </div>
            </div>

        </div>
    );
}


export default Footer;