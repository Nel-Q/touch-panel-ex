import CrComLib from "@crestron/ch5-crcomlib";
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
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Footer() {
    const [isMuted, setIsMuted] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    
    // change initial volume from a string to a number
    useEffect(() => {
        window.CrComLib.subscribeState('n', '1', value=> setSliderValue(value))
    }, [])
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const programShutOff = () => {
        closeModal()
        window.CrComLib.publishEvent('b', '30', true);
        window.CrComLib.publishEvent('b', '30', false);
        navigate('/');
        console.log("program shut off")
    }
    const increaseVolume = () => {
        setSliderValue((prevValue) => prevValue + 1);
        window.CrComLib.publishEvent('b', '22', true);
        window.CrComLib.publishEvent('b', '22', false);
        console.log('volume increased')

    }
    const decreaseVolume = () => {
        setSliderValue((prevValue) => prevValue - 1);
        window.CrComLib.publishEvent('b', '21', true);
        window.CrComLib.publishEvent('b', '21', false);
        console.log('volume decreased')
    }
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        window.CrComLib.publishEvent('n', '1', sliderValue)
        
      };
    
    const toggleMute = () => {
        setIsMuted((prevIsMuted) => !(prevIsMuted));
        if (isMuted) {
            window.CrComLib.publishEvent('b', '20', false);
            console.log('program unmuted')
        } else{
            window.CrComLib.publishEvent('b', '20', true);
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
                    <Button onClick={toggleMute} className="muteButton" >
                        {isMuted ?<VolumeOffSharpIcon sx={{fontSize:40}}/> : <VolumeOffOutlinedIcon sx={{fontSize:40}}/>}
                    </Button>
                    <Button onClick={decreaseVolume}>
                        <RemoveIcon />
                    </Button>
                    <Slider 
                        sx={{width:80}}
                        value={sliderValue}
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