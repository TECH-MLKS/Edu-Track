// src/components/Header.js
import React, { useState } from 'react';
import { auth } from '../Firebase/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const user = auth.currentUser;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/Edu-Track'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const goToProfileInfo = () => {
        navigate('/profileinfo'); // Navigate to ProfileInfo page
    };

    // Fallback URL for profile picture if the user doesn't have a profile photo
    const defaultProfilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDnI9ruH113ERMUf-pnbwqQea-AXP1FrF46jtxwOb4w0UXRTqLpCAsMuAnBJNUGpZ2EI&usqp=CAU";

    return (
        <header className="header">
            <div className="logo">
                <img src="/text.png" alt="Logo" />
            </div>
            {/* {user && (
                <div className="user-info">
                    <span>{user.email}</span>
                    {user.photoURL && <img src={user.photoURL} alt="User" className="user-photo" />}
                    <button className="profile-btn" onClick={toggleDropdown}>
                        <img src={user.photoURL || "/default-profile-icon.png"} alt="Profile" className="profile-icon" />
                    </button> */}
            {user && (
                <div className="user-info">
                    <span>{user.email}</span>
                    <button className="profile-btn" onClick={toggleDropdown}>
                        {/* Use user photo URL or fallback to the default image */}
                        <img 
                            src={user.photoURL || defaultProfilePic} 
                            alt="Profile" 
                            className="profile-icon" 
                        />
                    </button>
                    {isDropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={goToProfileInfo}>ProfileInfo</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
