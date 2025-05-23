import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Grid2 } from '@mui/material';
import '../styles/About.css';

function About({ open, onClose }) {
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
            <DialogTitle><div className='about-title'>About</div></DialogTitle>
            <Box mb={3} />
            <DialogContent>
                <Grid2 container spacing={2}>
                        <Grid2 item size={6}>
                            <h2>Welcome to IntelliShield!</h2>
                            <Box mb={4}>
                                <ul>
                                    <li className='about-bullet-text'>Innovating Fire Safety for a Safer Tomorrow</li>
                                    <li className='about-bullet-text'>IntelliShield is dedicated to revolutionizing fire extinguisher inspections. Our cutting-edge app ensures efficient, accurate, and reliable safety checks, keeping you compliant with the highest safety standards.</li>
                                </ul>
                            </Box>
                            
                            <h2>Vision</h2>
                            <Box mb={4}>
                                <ul>
                                    <li className='about-bullet-text'>To set the trend for smart fire safety inspections.</li>
                                </ul>
                            </Box>
                            
                            <h2>Mission</h2>
                            <Box mb={4}>
                                <ul>
                                    <li className='about-bullet-text'>Streamline fire extinguisher inspections with advanced technology.</li>
                                    <li className='about-bullet-text'>Provide real-time, precise data for informed safety management.</li>
                                    <li className='about-bullet-text'>Enhance safety through intuitive and reliable solutions.</li>
                                </ul>
                            </Box>
                        </Grid2>
                        
                        <Grid2 item size={6}>
                            <h2>Who We Are</h2>
                            <Box mb={4}>
                                <ul>
                                    <li className='about-bullet-text'>Innovation: Harnessing the latest tech for seamless and efficient inspections.</li>
                                    <li className='about-bullet-text'>Expert Support: Our team is always ready to assist you.</li>
                                    <li className='about-bullet-text'>Safety Focus: Advanced features prioritizing your safety.</li>
                                </ul>
                            </Box>
                            
                            <h2>Why Choose IntelliShield</h2>
                            <Box mb={4}>
                                <ul>
                                    <li className='about-bullet-text'>IntelliShield - the smart choice for fire extinguisher inspections.</li>
                                </ul>
                            </Box>
                        </Grid2>
                </Grid2>
            </DialogContent>
        </Dialog>
    );
}

export default About;
