import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios/tokenAxios';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/board/login/', {username, password})
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axios.defaults.headers['Authorization'] = 'Bearer ' + res.data.access;
                navigate('/board');
            })
            .catch((err) => {
                console.error('로그인 실패', err);
                alert('로그인 실패');
            });
    };

    const handle42Login = () => {
        window.location.href = 'http://localhost:8000/board/oauth/login/';
    }

    return (
        <div className="login-container">
            <h2 className="login-title">로그인</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>아이디</label>
                    <input 
                        type="text" 
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input 
                        type="password" 
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
            <button className='oauth-button' onClick={handle42Login}>42 로그인</button>
        </div>
    );
};

export default Login;