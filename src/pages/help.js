import React, { useEffect, useState } from 'react';
import { Box, Dialog, DialogTitle, IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import '../styles/About.css';
import First from '../images/help_page/first_img.png';
import Second from '../images/help_page/second_img.png';
import Third from '../images/help_page/third_img.png';
import Fourth from '../images/help_page/fourth_img.png';
import Fifth from '../images/help_page/fifth_img.png';


function Help({ open, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // To automatically change images every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, );

    const images = [
        First,
        Second,
        Third,
        Fourth,
        Fifth
    ];
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: {
                    minWidth: '88%',
                    minHeight: '88%',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }}
        >
            <DialogTitle>
                <div className='about-title'>Help</div>
            </DialogTitle>
            <Box mb={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton onClick={prevImage} style={{ position: 'absolute', left: '10px' }}>
                <ArrowBack />
                </IconButton>

                <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                style={{ width: '50%', height: '25%', transition: 'opacity 0.5s ease-in-out' }}
                />

                <IconButton onClick={nextImage} style={{ position: 'absolute', right: '10px' }}>
                <ArrowForward />
                </IconButton>
            </Box>
        </Dialog>
    );    
}

export default Help;
