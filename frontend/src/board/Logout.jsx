import React from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Logout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post(`/board/logout/`, {refresh_token : Cookies.get('refresh')})
            .then(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axios.defaults.headers['Authorization'] = null;

                // 쿠키에서 토큰 제거
                Cookies.remove('access');
                Cookies.remove('refresh');
                setIsLoggedIn(false);
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