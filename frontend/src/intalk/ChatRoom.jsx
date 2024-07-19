import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';

const ChatRoom = () => {
    const { roomName } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);
    const username = "current_user"; // 현재 사용자의 이름 (임시로 설정)

    useEffect(() => {
        const encodedRoomName = encodeURIComponent(roomName);
        webSocket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${encodedRoomName}/`);

        webSocket.current.onopen = () => {
            console.log('WebSocket connected');
        };

        webSocket.current.onclose = (e) => {
            console.log('WebSocket disconnected:', e.reason);
        };

        webSocket.current.onerror = (e) => {
            console.error('WebSocket error:', e);
        };

        webSocket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages(prev => [...prev, data]);
        };

        return () => {
            webSocket.current.close();
        };
    }, [roomName]);

    const handleSendMessage = () => {
        const messageData = {
            message,
            user: username
        };
        webSocket.current.send(JSON.stringify(messageData));
        setMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-room">
                <h1>{roomName}</h1>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.user === username ? 'mine' : 'others'}`}>
                            <div className="message-user">{msg.user}</div>
                            <div className="message-content">{msg.message}</div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>전송</button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;