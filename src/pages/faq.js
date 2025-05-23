import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/About.css';

function Faq({ open, onClose }) {
    // Sample data for FAQ
    const faqData = [
        {
            question: "What if the scanner doesn't read the code?",
            answer: "Ensure the code is clear. Clean the scanner's camera, then try again. If it still doesn't work, restart the scanner or contact support."
        },
        {
            question: "How does the Bluetooth connection work?",
            answer: "Turn on Bluetooth, enable pairing mode, and select the IntelliShield device. Make sure both devices are close."
        },
        {
            question: "How do I navigate the inspection checklist?",
            answer: "Open the app and scan the fire extinguisher. The app will take you to the checklist page."
        },
        {
            question: "Where is my inspection data stored?",
            answer: "Your data is securely encrypted and stored in the cloud, accessible only to authorized personnel."
        },
        {
            question: "Can third parties access our data?",
            answer: "Yes, but only with your permission through API tokens for integration."
        },
        {
            question: "What should I do if I detect a leakage?",
            answer: "Record it in the app and notify your maintenance team right away."
        },
        {
            question: "How frequently should inspections be carried out?",
            answer: "Use the app to schedule inspections and set reminders to stay compliant."
        },
        {
            question: "Who do I contact for help?",
            answer: "Reach out to our support team for any technical issues or questions."
        }
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
            <DialogTitle><div className='about-title'>FAQ's</div></DialogTitle>
            <Box mb={3} />
            <DialogContent>
            <div>
                {faqData.map((faq, index) => (
                    <Accordion key={index} elevation={0} style={{ marginBottom: '16px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                            className='summary-txt'
                        >
                            {faq.question}
                        </AccordionSummary>
                        <AccordionDetails className='summary-content'>
                            {faq.answer}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
            </DialogContent>
        </Dialog>
    );
}

export default Faq;
