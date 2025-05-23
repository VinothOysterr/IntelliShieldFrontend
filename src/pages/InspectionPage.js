import React, { useState, useEffect, useRef } from "react";
import { MenuItem, Button, Menu, Box, Grid2 } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCodeGenerator from "./qr_page";
import axios from "axios";

import dotMenu from '../images/menu_icon.svg';
import '../styles/Inspection.css';

function InspectionPage() {
    const loc = useLocation();
    const is_number = loc.state?.is_number;

    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState({});

    const navigate = useNavigate();

    const qrRef = useRef(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDateChange = (event) => {
        const { value, name } = event.target;

        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        }
    };

    const downloadDataSheet = async () => {
        const fId = data.is_number;
        const startingDate = startDate;
        const endingDate = endDate;

        if (!fId || !startingDate || !endingDate) {
            console.error("Missing required parameters.");
            return;
        }
    
        const URL = `http://127.0.0.1:6547/fireextinguishers/filter/${fId}?start_date=${startingDate}&end_date=${endingDate}`;

        try {
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Data Sheet Response:", responseData);
        } catch (error) {
            console.error("Error downloading data sheet:", error);
        }
            // console.log(`${data.is_number}: ${startDate} to ${endDate}`);
    };

    const downloadQRCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const qrCanvasSize = canvas.width;
        const padding = 20; // White border size

        // Create a new canvas to add padding
        const paddedCanvas = document.createElement('canvas');
        paddedCanvas.width = qrCanvasSize + padding * 2;
        paddedCanvas.height = qrCanvasSize + padding * 2;
        const ctx = paddedCanvas.getContext('2d');

        // Fill the new canvas with white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

        // Draw the QR code onto the new canvas with padding
        ctx.drawImage(canvas, padding, padding);

        // Convert the padded canvas to a data URL and trigger download
        const pngUrl = paddedCanvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${is_number}_qrcode.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

    // const token = getCookie('session_id');

    const adminLocation = getCookie('location');

    async function handleCylinderData(is_number) {
        try {
            const response = await axios.get(`http://127.0.0.1:6547/fireextinguishers/web/${is_number}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (is_number) {
            handleCylinderData(is_number);
        }
    }, [is_number]);

    function handleLogout() {
        const token = getCookie('token');
    
        axios.post('http://localhost:6547/admins/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            document.cookie = 'session_id=; Max-Age=0; path=/';
            navigate('/');
        })
        .catch(error => {
            console.error('Logout failed:', error);
            alert('Logout failed. Please try again.');
        });
    };

    return (
        <div className="page-container">
            <div className="container">
                <header>
                    <div className="add-new-header">
                        <div>Name / Location : {adminLocation}</div>
                        <div>License Number : </div>
                    </div>

                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}>
                        <img src={dotMenu} alt="Menu" />
                    </Button>

                    <Menu
                        keepMounted
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        open={Boolean(anchorEl)}>
                        <MenuItem onClick={handleClose}>About</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>FAQ'S</MenuItem>
                        <MenuItem onClick={handleClose}>References</MenuItem>
                        <MenuItem onClick={handleClose}>Contact us</MenuItem>
                        <MenuItem onClick={handleClose}>Help</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </header>

                <div className="line"></div>
    
                <Box mb={2} />
                <div className="row">
                    <div className="fe-data-container">
                        <div className="addnew-txt-right">Data on the fire extinguisher inspection card</div>
                        
                        <Box mb={2} />

                        <div className="fe-data">
                            <div className="fe-data-half">
                            {[
                                { label: "Serial No / Intellishield No", value: "ISN-COT-123456" },
                                { label: "Location tag Number", value: "2nd floor" },
                                { label: "Name of Location", value: "Chennai" },
                                { label: "Type of Extinguisher", value: "CO2 Type" },
                                { label: "Capacity / UOM", value: "3 kg" },
                                { label: "Date of Manufacturing", value: "2024-09-01" },
                            ].map((item, index) => (
                                <Grid2 container spacing={3} key={index}>
                                <Grid2 item size={6} style={{ textAlign: "left" }}>
                                    <div className="fe-data-txt">{item.label}</div>
                                </Grid2>
                                <Grid2 item size={1} style={{ textAlign: "center" }}>
                                    :
                                </Grid2>
                                <Grid2 item size={3} style={{ textAlign: "left" }}>
                                    <div className="fe-data-txt">{item.value}</div>
                                </Grid2>
                                <Box mb={1} />
                                </Grid2>
                            ))}
                            </div>
                            <div className="fe-data-half">
                                {[
                                    { label: "Life of Fire Extinguisher", value: data.expiry_date },
                                    { label: "Date of Refilling", value: data.date_of_refilling },
                                    { label: "Due Date of Refilling", value: data.due_of_refilling },
                                    { label: "Date of HPT", value: data.date_of_hpt },
                                    { label: "Due Date of HPT", value: data.due_of_hpt },
                                    { label: "Service Provider", value: data.service_provider },
                                ].map((item, index) => (
                                    <Grid2 container spacing={3} key={index}>
                                    <Grid2 item size={6} style={{ textAlign: "left" }}>
                                        <div className="fe-data-txt">{item.label}</div>
                                    </Grid2>
                                    <Grid2 item size={1} style={{ textAlign: "center" }}>:</Grid2>
                                    <Grid2 item size={3} style={{ textAlign: "left" }}>
                                        <div className="fe-data-txt">{item.value}</div>
                                    </Grid2>
                                    <Box mb={1} />
                                    </Grid2>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="ver-line"></div>

                    <div className="print-data-container">
                        <div className="qr-container">
                        <div className="addnew-txt-right">Data Sheet</div>
                        <div className="print-data-inner-big-container">
                            <div className="print-data-inner-container">
                                <div className="filter-date-label-field">
                                    <label className="print-label">Start Date:</label>
                                    <input className="filter-date-field" type="date" name="startDate" placeholder="Select a date" onChange={handleDateChange} />
                                </div>
                                <div className="filter-date-label-field">
                                    <label className="print-label">End Date:</label>
                                    <input className="filter-date-field" type="date" name="endDate" onChange={handleDateChange} />
                                </div>
                            </div>

                            <button className="print-btn" onClick={downloadDataSheet}>
                                <div className="print-btn-txt">Print</div>
                            </button>
                        </div>
                        </div>
                    </div>

                    <div className="ver-line"></div>

                    <div className="print-data-container">
                        <div className="qr-container">
                            <div className="addnew-txt-right">Print card</div>
                            <div ref={qrRef}>
                                <QRCodeGenerator value={is_number} />
                            </div>
                            <button className="print-btn" onClick={downloadQRCode}>
                                <div className="print-btn-txt">Download QR Code</div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="line"></div>

                <Box mb={1} />
                <div className="addnew-txt">Description of maintenance activity</div>
                <Box mb={2} />

                <table className="maintenance-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Inspection Date</th>
                            <th rowSpan="2">Due Date</th>
                            <th rowSpan="2">Capacity / UOM</th>
                            <th rowSpan="2">Weight of Cylinder</th>
                            <th rowSpan="2">Indicated pressure</th>
                            <th colSpan="4">CONDITION OF PARTS</th>
                            <th colSpan="4">CONDITION OF CYLINDER</th>
                        </tr>
                        <tr>
                            <th className="inner-row">Cylinder Nozzle</th>
                            <th className="inner-row">Operating levers</th>
                            <th className="inner-row">Safety pin</th>
                            <th className="inner-row">Pressure gauge</th>
                            <th className="inner-row">Paint peeled off</th>
                            <th className="inner-row">Presence of rust</th>
                            <th className="inner-row">Damaged cylinder</th>
                            <th className="inner-row">Dent on the body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.monthly_activities && data.monthly_activities.length > 0 ? (
                            data.monthly_activities.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.inspection_date}</td>
                                    <td>{activity.due_date}</td>
                                    <td>{activity.capacity_uom}</td>
                                    <td>{activity.weight}</td>
                                    <td>{activity.pressure}</td>
                                    <td>{activity.cylinder_nozzle ? 'Yes' : 'No'}</td>
                                    <td>{activity.operating_lever ? 'Yes' : 'No'}</td>
                                    <td>{activity.safety_pin ? 'Yes' : 'No'}</td>
                                    <td>{activity.pressure_gauge ? 'Yes' : 'No'}</td>
                                    <td>{activity.paint_peeled_off ? 'Yes' : 'No'}</td>
                                    <td>{activity.presence_of_rust ? 'Yes' : 'No'}</td>
                                    <td>{activity.damaged_cylinder ? 'Yes' : 'No'}</td>
                                    <td>{activity.dent_on_body ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="15">No monthly activities available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InspectionPage;