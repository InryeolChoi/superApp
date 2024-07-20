import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const ChatHome = () => {
    return (
        <Routes>
            <Route path="/" element={<ChatList />} />
            <Route path="/room/:roomName" element={<ChatRoom />} />
        </Routes>
    );
};

export default ChatHome;