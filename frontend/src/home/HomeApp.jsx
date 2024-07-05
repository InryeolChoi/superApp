import React from "react"
import { useNavigate } from "react-router-dom"
import './HomeApp.css'

const HomeApp = () => {
    const navigate = useNavigate()

    const gotolist = () => {
        navigate('/list')
    }

    const gotoboard = () => {
        navigate('/board')
    }

    return (
        <div id="homebox">
            <h1 id="title">Home</h1>
            <ul id="menu-list">
                <button id="menu-button" onClick={gotolist}>Todo-list로 가기</button>
                <button id="menu-button" onClick={gotoboard}>Board로 가기</button>
            </ul>
        </div>
    )
}

export default HomeApp;