// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Welcome from './Components/Welcome';
import ProfileInfo from './Components/ProfileInfo'; 
import Sidebar from './Components/Sidebar/Sidebar';
import Page1 from './Components/Sidebar/Pages/Page1';
import Page2 from './Components/Sidebar/Pages/page2';
import Page3 from './Components/Sidebar/Pages/Page3';
import Page4 from './Components/Sidebar/Pages/Page4';
import Page5 from './Components/Sidebar/Pages/Page5';




function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}></div>
        <Routes>
          <Route path="/Edu-Track" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/profileinfo" element={<ProfileInfo />} />
          <Route path="/Page1" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/Page3" element={<Page3 />} />
          <Route path="/Page4" element={<Page4 />} />
          <Route path="/Page5" element={<Page5 />} />

        </Routes>
      </div>
    </Router >
  );
}

export default App;
