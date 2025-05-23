import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/about';
import Dashbord from './pages/dashboard';
import NewFE from './pages/newFE';
import InspectionPage from './pages/InspectionPage';
import License from './pages/license';
import GodMode from './pages/god_mode';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashbord />} />
          <Route path='/about' element={<About />} />
          <Route path='/add_new' element={<NewFE />} />
          <Route path='/inspection' element={<InspectionPage />} />
          <Route path='/god_mode' element={<GodMode />} />
          <Route path='/license' element={<License />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
