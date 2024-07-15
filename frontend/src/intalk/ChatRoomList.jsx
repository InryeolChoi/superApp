import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../Axios/tokenAxios';
import './Chat.css';

const ChatRoomList = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');

    useEffect(() => {
        axios.get('/intalk/chatrooms/')
            .then(response => setChatRooms(response.data))
            .catch(error => console.error('Error fetching chat rooms:', error));
    }, []);

    const handleCreateRoom = () => {
        axios.post('/intalk/chatrooms/', { name: newRoomName })
            .then(response => {
                setChatRooms(prev => [...prev, response.data]);
                setNewRoomName('');
            })
            .catch(error => console.error('Error creating chat room:', error));
    };

    return (
        <div className="chat-container">
            <div className="chat-room-list">
                <h1>채팅방 목록</h1>
                <ul>
                    {chatRooms.map(room => (
                        <li key={room.id}>
                            <Link to={`/intalk/room/${room.name}`}>{room.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="create-room">
                    <input
                        type="text"
                        value={newRoomName}
                        onChange={e => setNewRoomName(e.target.value)}
                        placeholder="새 채팅방 이름"
                    />
                    <button onClick={handleCreateRoom}>생성</button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomList;