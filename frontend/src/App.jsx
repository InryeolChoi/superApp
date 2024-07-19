import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeApp from './home/HomeApp';
import Board from './board/Board';
import Chathome from './intalk/ChatHome';
import TodoHome from './todolist/TodoHome';
import './App.css';

const App = () => {
    return (
        <div className="container">
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomeApp />} />
                    <Route path='/list/*' element={<TodoHome />} />
                    <Route path="/board/*" element={<Board />} />
                    <Route path="/intalk/*" element={<Chathome />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;