import React from "react";
import { useNavigate } from "react-router-dom";
import './HomeApp.css';

const HomeApp = () => {
    const navigate = useNavigate();
    const gotolist = () => {navigate('/list');}
    const gotoboard = () => {navigate('/board');}
    const gotoIntalk = () => {navigate('/intalk');}

    return (
        <div id="homebox">
            <h1 id="home-title">Home</h1>
            <div id="home-memu-list">
                <span id="home-menu-box">
                    <button id="home-menu-button" onClick={gotolist}>Todo-list로 가기</button>
                    <button id="home-menu-button" onClick={gotoboard}>Board로 가기</button>
                </span>
                <span id="home-menu-box">
                    <button id="home-menu-button" onClick={gotoIntalk}>인렬톡으로 가기</button>
                    <button id="home-menu-button">핑퐁으로 가기</button>
                </span>
            </div>
        </div>
    );
}

export default HomeApp;