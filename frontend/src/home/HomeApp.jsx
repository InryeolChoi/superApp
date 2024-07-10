import React from "react";
import { useNavigate } from "react-router-dom";
import './HomeApp.css';

const HomeApp = () => {
    const navigate = useNavigate();

    const gotolist = () => {
        navigate('/list');
    }

    const gotoboard = () => {
        navigate('/board');
    }

    return (
        <div id="homebox">
            <h1 id="title">Home</h1>
            <div id="menu-list">
                <button className="menu-button" onClick={gotolist}>Todo-list로 가기</button>
                <button className="menu-button" onClick={gotoboard}>Board로 가기</button>
                <button className="menu-button">인렬톡으로 가기</button>
                <button className="menu-button">x라이더으로 가기</button>
            </div>
        </div>
    );
}

export default HomeApp;