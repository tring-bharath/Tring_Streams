import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const [inputEmail, setInputEmail] = useState(email); 

    const sendOtp = () => {
        
    };

    return (
        <div>
            <h1>Send OTP to:</h1>
            <form onSubmit={sendOtp}>
                <input
                    type="text"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Send OTP</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
