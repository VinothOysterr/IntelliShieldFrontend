import React, { useState } from "react";
import axios from 'axios';
import { MenuItem, Button, Menu, Grid2, TextField, Box, FormControl, Select, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../styles/NewFE.css';
import dotMenu from '../images/menu_icon.svg';

function NewFE() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [unit, setUnit] = useState('');
    const [fe_type, setFeType] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const [serialno, setSerialno] = useState('');
    const [expiry, setExpiry] = useState('');
    const [location_tag, setLocationTag] = useState('');
    const [refilling_date, setRefillingDate] = useState('');
    const [location, setLocation] = useState('');
    const [refilling_due, setRefillingDue] = useState('');
    const [hpt_date, setHptDate] = useState('');
    const [net_weight, setNetWeight] = useState('');
    const [cylinder_capacity, setCylinderCapacity] = useState('');
    const [hpt_due, setHptDue] = useState('');
    const [manufactured_date, setManufacturedDate] = useState('');
    const [service_provider, setServiceProvider] = useState('');

    const navigate = useNavigate();

    const handleFeType = (event) => {
        setFeType(event.target.value);
    };

    const handleChange = (event) => {
        setUnit(event.target.value);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function transformFormData() {
        return {
            cylinder_number: serialno,
            type_of_extinguisher: fe_type,
            location_tag_number: location_tag,
            location: location,
            service_provider: service_provider,
            uom: unit,
            net_weight: net_weight,
            capacity: `${cylinder_capacity} ${unit}`,
            date_of_refilling: refilling_date,
            due_of_refilling: refilling_due,
            date_of_hpt: hpt_date,
            due_of_hpt: hpt_due,
            manufacturing_date: manufactured_date,
            expiry_date: expiry
        };
    }

    // function getTokenFromCookies() {
    //     const cookies = document.cookie.split('; ');
    //     const tokenCookie = cookies.find(row => row.startsWith('session_id='));
    //     return tokenCookie ? tokenCookie.split('=')[1] : null;
    // }

    function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

    const adminLocation = getCookie('location');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const token = getTokenFromCookies();
        const token = getCookie('session_id');

        const transformedData = transformFormData();

        const response = await fetch('http://localhost:6547/fireextinguishers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transformedData)
        });

        if (response.ok) {
            setDialogMessage('Form submitted successfully!');
            setOpenDialog(true);

            // Reset form fields
            setSerialno('');
            setExpiry('');
            setLocationTag('');
            setRefillingDate('');
            setLocation('');
            setRefillingDue('');
            setHptDate('');
            setNetWeight('');
            setCylinderCapacity('');
            setHptDue('');
            setManufacturedDate('');
            setServiceProvider('');
            setFeType('');
            setUnit('');
        } else {
            // setDialogMessage(`Error submitting: ${response.statusText}`);
            // setOpenDialog(true);
            const errorData = await response.json();
            const errorMessage = errorData.detail || 'Error submitting form';
            setDialogMessage(errorMessage);  // Show the error message to the user
            setOpenDialog(true);
        }
    }

    function handleLogout() {
        const token = document.cookie.split('; ').find(row => row.startsWith('session_id=')).split('=')[1];
    
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
        <div className='page-container'>
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

                <Box mb={4} />

                <div className="addnew-txt">Add New</div>

                <Box mb={5} />
                <form onSubmit={handleSubmit}>
                    <Grid2 container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="serialno"
                                name="serialno"
                                label="Serial Number"
                                value={serialno}
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setSerialno(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="expiry"
                                name="expiry"
                                label="Expiration of fire extinguisher"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="location_tag"
                                name="location_tag"
                                label="Location Tag No"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={location_tag}
                                onChange={(e) => setLocationTag(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="refilling_date"
                                name="refilling_date"
                                label="Date of Refilling"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={refilling_date}
                                onChange={(e) => setRefillingDate(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="location"
                                name="location"
                                label="Name of Location"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="refilling_due"
                                name="refilling_due"
                                label="Due Date for Next Refilling"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={refilling_due}
                                onChange={(e) => setRefillingDue(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={3} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="fe-type-label">Type of Extinguisher</InputLabel>
                                <Select
                                    labelId="fe-type-label"
                                    id="fe-type"
                                    name="fe_type"
                                    value={fe_type}
                                    label="Type of Extinguisher"
                                    onChange={handleFeType}
                                >
                                    <MenuItem value={'Water Type'}>Water Type</MenuItem>
                                    <MenuItem value={'Foam Type'}>Foam Type</MenuItem>
                                    <MenuItem value={'CO2 Type'}>CO2 Type</MenuItem>
                                    <MenuItem value={'DCP Type'}>DCP Type</MenuItem>
                                    <MenuItem value={'K Type kitchen'}>K Type kitchen</MenuItem>
                                    <MenuItem value={'Clean Agent Type'}>Clean Agent Type</MenuItem>
                                    <MenuItem value={'Water Mist Type'}>Water Mist Type</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={3} md={2}>
                            <TextField
                                autoFocus
                                required
                                id="net_weight"
                                name="net_weight"
                                label="Net Weight"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={net_weight}
                                onChange={(e) => setNetWeight(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="hpt_date"
                                name="hpt_date"
                                label="Date of HPT"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={hpt_date}
                                onChange={(e) => setHptDate(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={3} md={2}>
                            <TextField
                                autoFocus
                                required
                                id="cylinder_capacity"
                                name="cylinder_capacity"
                                label="Capacity of the cylinder"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={cylinder_capacity}
                                onChange={(e) => setCylinderCapacity(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={3} md={2}>
                            <FormControl fullWidth>
                                <InputLabel id="unit-label">Unit</InputLabel>
                                <Select
                                    labelId="unit-label"
                                    id="unit"
                                    name="unit"
                                    value={unit}
                                    label="Unit"
                                    onChange={handleChange}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={'kg'}>Kg</MenuItem>
                                    <MenuItem value={'ltr'}>Ltr</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="hpt_due"
                                name="hpt_due"
                                label="Due Date for Next HPT"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={hpt_due}
                                onChange={(e) => setHptDue(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="manufactured_date"
                                name="manufactured_date"
                                label="Cylinder Manufacturing Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={manufactured_date}
                                onChange={(e) => setManufacturedDate(e.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                autoFocus
                                required
                                id="service_provider"
                                name="service_provider"
                                label="Service Provider"
                                type="text"
                                variant="outlined"
                                fullWidth
                                value={service_provider}
                                onChange={(e) => setServiceProvider(e.target.value)}
                            />
                        </Grid2>
                    </Grid2>
                    <div className="bottom-buttons">
                        <button type="submit" className="btn">
                            <div className="btntxt">    
                                Submit
                            </div>
                        </button>
                    </div>
                </form>
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                >
                    <DialogTitle>Submission Status</DialogTitle>
                    <DialogContent>
                        <Typography>{dialogMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default NewFE;
