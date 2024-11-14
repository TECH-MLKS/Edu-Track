// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../Firebase/Firebase';
import {
    setPersistence,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    browserLocalPersistence,
    browserSessionPersistence
} from 'firebase/auth';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        const persistenceType = keepLoggedIn ? browserLocalPersistence : browserSessionPersistence;

        try {
            await setPersistence(auth, persistenceType);
            await signInWithEmailAndPassword(auth, email, password);
            window.location.replace('/welcome'); // Redirect to welcome page
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    const forgotPass = async () => {
        if (email) {
            try {
                await sendPasswordResetEmail(auth, email);
                alert("Password reset email sent! Please check your inbox.");
            } catch (error) {
                console.error("Error sending password reset email:", error);
                alert("Failed to send password reset email. Please try again.");
            }
        } else {
            alert("Please enter your email address to reset your password.");
        }
    };

    return (
        <div className="container">
            <img src="text.gif" alt="Logo" className="logo" />  
            <div className="form-container">
                <h2>Login to your account</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <div className="keep-logged-in">
                        <input
                            type="checkbox"
                            id="keep-logged-in"
                            checked={keepLoggedIn}
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                        />
                        <label htmlFor="keep-logged-in">Keep me logged in</label>
                    </div>
                    <button type="submit" className="signup-button">Sign in</button>
                </form>
                <div className="forgot-password">
                    <button onClick={forgotPass} className="forgot-password-button">
                        I forgot my password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
