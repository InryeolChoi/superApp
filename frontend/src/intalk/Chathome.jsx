import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';

const Chathome = () => {
    return (
        <Routes>
            <Route path="/" element={<ChatRoomList />} />
            <Route path="/room/:roomName" element={<ChatRoom />} />
        </Routes>
    );
};

export default Chathome;