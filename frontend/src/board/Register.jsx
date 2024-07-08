import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('비밀번호가 맞지 않습니다.');
            return;
        }

        axios.post('/board/register/', { username, password })
            .then(response => {
                alert('회원가입 성공!');
                navigate('/board/login');
            })
            .catch(error => {
                console.error('회원가입 중 에러 발생!:', error);
            });
    };

    const handleBack = () => {
        navigate('/board');
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
                <button type="button" className="back-button" onClick={handleBack}>Back</button>
            </form>
        </div>
    );
}

export default Register;