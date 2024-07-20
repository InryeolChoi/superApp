import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../Axios/tokenAxios';
import './OTPVerification.css';

const OTPVerification = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/board/otp/verify/', { email, otp }, { onAuthFail: () => navigate('/login') })
            .then((res) => {
                console.log('OTP verified', res);
                alert('인증이 완료되었습니다.');
                navigate('/board');
            })
            .catch((err) => {
                console.error('OTP verification failed', err);
                alert('OTP 인증 실패');
            });
    };

    return (
        <div id="otp-verification-container">
            <h2 id="otp-verification-title">OTP 인증</h2>
            <form id="otp-verification-form" onSubmit={handleSubmit}>
                <div>
                    <label>OTP</label>
                    <input 
                        type="text" 
                        className="input-field"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <button type="submit">인증</button>
            </form>
        </div>
    );
};

export default OTPVerification;