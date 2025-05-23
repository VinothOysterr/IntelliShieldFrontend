import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid2, Box, TextField, MenuItem, Button, Menu, IconButton } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import About from './about'; 
import Faq from './faq';

import '../styles/Dashboard.css';
import dotMenu from '../images/menu_icon.svg';
import eye from '../images/eye-line.svg';
import createNew from '../images/create_user_icon.svg';
import addNew from '../images/add_new.svg';
import Help from "./help";

function Dashboard() {
	const [anchorEl, setAnchorEl] = React.useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
	const navigate = useNavigate();

	const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
	const [openAbout, setOpenAbout] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
//   const [error, setError] = useState(null);

	const [open, setOpen] = useState(false);

	const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingsAnchorEl(null);
  };

  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

	const handleOpenAbout = () => {
        setOpenAbout(true);
        handleClose();
    };

    const handleCloseAbout = () => {
        setOpenAbout(false);
    };

    const handleOpenFaq = () => {
      setOpenFaq(true);
      handleClose();
  };

  const handleCloseFaq = () => {
      setOpenFaq(false);
  };

  const handleOpenHelp = () => {
    setOpenHelp(true);
    handleClose();
};

const handleCloseHelp = () => {
    setOpenHelp(false);
};

	function handleEye(is_number) {
		console.log(is_number);
    navigate('/inspection', { state: { is_number } });
	}

  function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	useEffect(() => {
        const fetchData = async () => {
            const adminId = getCookie('admin_id');
            if (!adminId) {
                console.error('Admin ID not found in cookies');
                setLoading(false);
                return;
            }

            const url = `http://localhost:6547/fireextinguishers/fe_data/${adminId}`;

            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
                // setError('Data Not Found...');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

	if (loading) return <p>Loading...</p>;

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

  function moveToAddNewPage() {
	  navigate('/add_new');
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson.password !== formJson.confirm_password) {
      alert("Password don't match");
      return;
    }

    try {
      const response = await fetch('http://localhost:6547/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      console.log('User created: ', data);
      handleCloseDialog();
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <div className='page-container'>
        <div className="container">
            <header>
                <div className='intellishield'>
                    <span>I</span>
                    <span className='ntellishield'>
                    <span>NTELLI</span>
                    <span className='s'>S</span>
                    <span className='hield'>HIELD</span>
                    </span>
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
                
                    <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                      <Menu
                        keepMounted
                        anchorEl={settingsAnchorEl}
                        onClose={handleClose}
                        open={Boolean(settingsAnchorEl)}>
                        <MenuItem onClick={handleOpenAbout}>About</MenuItem>
                        <MenuItem onClick={handleOpenHelp}>Help</MenuItem>
                      </Menu>
                    <MenuItem onClick={handleOpenFaq}>FAQ'S</MenuItem>
                    <MenuItem onClick={handleClose}>References</MenuItem>
                    <MenuItem onClick={handleClose}>Contact us</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
				<About open={openAbout} onClose={handleCloseAbout} />
        <Faq open={openFaq} onClose={handleCloseFaq} />
        <Help open={openHelp} onClose={handleCloseHelp} />
            </header>

			<div className="line"></div>

			<div className="addnew-txt">List of Intellishield</div>

			<table>
				<thead className="table-head">
					<tr>
						<th>Sl. No</th>
						<th>Serial No / Intellishield No</th>
						<th>Name of the Location</th>
						<th>Location Tag No</th>
						<th>Cylinder Number</th>
						<th>D.O.Refilling</th>
						<th>D.O.Next Refilling</th>
						<th>Information</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{data.map((item, index) => (
						<tr key={item.id}>
							<td>{index + 1}</td>
							<td>{item.is_number || 'N/A'}</td>
							<td>{item.location || 'N/A'}</td>
							<td>{item.location_tag_number || 'N/A'}</td>
							<td>{item.cylinder_number || 'N/A'}</td>
							<td>{item.date_of_refilling || 'N/A'}</td>
							<td>{item.due_of_refilling || 'N/A'}</td>
							<td>
								<IconButton aria-label="Example" onClick={() => handleEye(item.is_number)}>
								<img src={eye} alt="View Icon" />
								</IconButton>
							</td>
						</tr>
					))}
				</tbody>
			</table>
        </div>

        <div className="bottom-buttons">
            <button type="button" className="btn" onClick={handleClickOpenDialog}>
                <img src={createNew} alt="Create User"/>
                <div className="btntxt">    
                    Create User
                </div>
            </button>
            <button type="button" className="btn" onClick={moveToAddNewPage}>
                <img src={addNew} alt="Add New Extinguisher"/>
                    <div className="btntxt">
                        Add New
                    </div>
            </button>
        </div>

        <Dialog
			open={open}
			onClose={handleCloseDialog}
			PaperProps={{
				style: { 
					maxWidth: '960px',
					maxHeight: '736px',
					padding: '20px'
				},
				component: 'form',
				onSubmit: handleSubmit,
			}}
        >
        <DialogTitle>Create User</DialogTitle>
        <Box mb={2} />
        <DialogContent>
			<Grid2 container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid2 item xs={6}>
				<Box mb={2}>
				<TextField autoFocus required id="username" name="username" label="User Name" type="text" variant="outlined" fullWidth />
				</Box>
				<Box mb={2}>
				<TextField autoFocus required id="role" name="role" label="Role" type="text" variant="outlined" fullWidth />
				</Box>
				<Box mb={2}>
				<TextField autoFocus required id="mobile" name="mobile" label="Mobile No" type="text" variant="outlined" fullWidth />
				</Box>
				<Box mb={2}>
				<TextField autoFocus required id="password" name="password" label="Password" type="password" variant="outlined" fullWidth />
				</Box>
				</Grid2>
				<Grid2 item xs={6}>
				<Box mb={2}>
				<TextField autoFocus required id="doj" name="doj" label="D.O.J" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
				</Box>
				<Box mb={2}>
				<TextField autoFocus required id="name" name="name" label="Full Name" type="text" variant="outlined" fullWidth />
				</Box>
				<Box mb={2}>
				<TextField autoFocus required id="aadhaar" name="aadhaar" label="Aadhaar No" type="text" variant="outlined" fullWidth />
				</Box>
				<Box mb={2}>
				<TextField autoFocus required id="confirm_password" name="confirm_password" label="Confirm Password" type="password" variant="outlined" fullWidth />
				</Box>
				</Grid2>
			</Grid2>
        </DialogContent>
        
        <DialogActions>
			<button type="submit" className="create-btn">
				<div className="btntxt">Create</div>
			</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;
