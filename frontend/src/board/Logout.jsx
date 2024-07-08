import React from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post(`/board/logout/`, {refresh_token : localStorage.getItem('refresh_token')})
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axios.defaults.headers['Authorization'] = null;
                navigate(`/board/`);
            })
            .catch((err) => {
                console.error('로그아웃 실패', err);
            })
    }

    return (
        <button className='parts' onClick={handleLogout}>로그아웃</button>
    )
}

export default Logout;