// src/components/ProfileInfo.js
import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import "./ProfileInfo.css";

function ProfileInfo() {
    const [userData, setUserData] = useState({
        email: '',
        displayName: '',
        photoURL: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserData({
                email: user.email,
                displayName: user.displayName || 'No name set',
                photoURL: user.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDnI9ruH113ERMUf-pnbwqQea-AXP1FrF46jtxwOb4w0UXRTqLpCAsMuAnBJNUGpZ2EI&usqp=CAU', // Fallback if no photo
            });
        } else {
            navigate('/Edu-Track'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    return (
        <div style={{ margin: '100px', textAlign: 'center' }}>
            <h2>Profile Information</h2>
            <div>
                <img 
                    src={userData.photoURL} 
                    alt="Profile" 
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
                />
            </div>
            <div>
                <p>Email: {userData.email}</p>
                <p>Display Name: {userData.displayName}</p>
            </div>
        </div>
    );
}

export default ProfileInfo;
