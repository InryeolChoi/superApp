import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';

const ChatRoom = () => {
    const { roomName } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
        const encodedRoomName = encodeURIComponent(roomName);
        webSocket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${encodedRoomName}/`);

        webSocket.current.onopen = () => {
            console.log('WebSocket connected');
        };

        webSocket.current.onclose = (e) => {
            console.log('WebSocket disconnected:', e.reason);
            alert(`웹소켓이 끊겼습니다.`)
        };

        webSocket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages(prev => [...prev, data.message]);
        };

        return () => {
            webSocket.current.close();
        };
    }, [roomName]);

    const handleSendMessage = () => {
        const messageData = {
            message,
        };
        webSocket.current.send(JSON.stringify(messageData));
        setMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-room">
                <h1>채팅방: {roomName}</h1>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="chat-message">{msg}</div>
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