// src/components/Welcome.js
import React, { useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase';
import { onAuthStateChanged,  } from 'firebase/auth';
//    signOut
import Header from './Header'; // Import Header component

function Welcome() {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                window.location.replace('/Edu-Track'); // Redirect to login if not authenticated
            }
        });
        return () => unsubscribe();
    }, []);

    // const handleLogout = async () => {
    //     await signOut(auth);
    //     window.location.replace('/Edu-Track'); // Redirect to login after logout
    // };

    return (
        <div>
            <Header /> {/* Include the header */}
            <div style={{ margin: '100px', textAlign: 'center' }}>
                <h2>Hello, {userEmail}</h2>
                <p>Welcome to auth starter, you are successfully logged in!</p>
                {/* <button onClick={handleLogout}>Logout</button> */}
            </div>
        </div>
    );
}

export default Welcome;
