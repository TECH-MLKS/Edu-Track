// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">My App</h2>
            <nav>
                <ul>
                    <li><Link to="/welcome">Home</Link></li>
                    <li><Link to="/Page1">School Info</Link></li>
                    <li><Link to="/Page2">Fee Portal</Link></li>
                    <li><Link to="/Page3">Attendance</Link></li>
                    <li><Link to="/Page4">Report Card</Link></li>
                    <li><Link to="/Page5">Time Table</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
