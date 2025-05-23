import React, { useState } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import loginLogo from '../images/login_img.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');

    axios.post('http://localhost:6547/admins/login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      document.cookie = `session_id=${response.data.access_token}; path=/`; // Store access_token 
      document.cookie = `admin_id=${response.data.admin_id}; path=/`; 
      document.cookie = `location=${response.data.location}; path=/`;
      navigate('/dashboard');
    })
    .catch(error => {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    });
  };

  return (
    <div className='login-container'> 
      <div className='login-left-container'>
        <div className='login-left-inner-upper-container'>
          <div className="intellishield">
            <span>I</span>
            <span className="ntellishield">
              <span>NTELLI</span>
              <span className="s">S</span>
              <span className="hield">HIELD</span>
            </span>
          </div>
          <div className='welcome-text'>
            Welcome Let's get started!
          </div>
        </div>
        
        <div className='login-left-inner-container'>
          <div className='text-field-container'>
            <label htmlFor="username">User Name</label>
            <input type="text" name="username" id="username" className='text-field' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
          </div>
          
          <div className='text-field-container'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className='text-field' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <button type="submit" className='login-btn' onClick={handleClick}>Login</button>
        </div>
      </div>
      
      <div>
        <img src={loginLogo} alt="login logo"/>
      </div>
    </div>
  );
}

export default Home;
