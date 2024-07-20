import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios/tokenAxios';
import './EmailVerification.css';

const EmailVerification = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/board/otp/send/', { email }, { timeout: 5000 })
            .then((res) => {
                console.log('OTP sent', res);
                navigate('/board/otp-verification', { state: { email } });
            })
            .catch((err) => {
                console.error('OTP sending failed', err);
                alert('OTP 전송 실패');
            });
    };

    return (
        <div id="email-verification-container">
            <h2 id="email-verification-title">이메일 인증</h2>
            <form id="email-verification-form" onSubmit={handleSubmit}>
                <div>
                    <label>이메일</label>
                    <input 
                        type="email" 
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">OTP 전송</button>
            </form>
        </div>
    );
};

export default EmailVerification;