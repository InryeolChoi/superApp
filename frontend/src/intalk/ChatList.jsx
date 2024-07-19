import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from '../Axios/simpleAxios';
import './Chat.css';

const ChatList = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [isBeginChatOpen, setIsBeginChatOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const popupRef = useRef(null);
    
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
                setIsBeginChatOpen(false);
            })
            .catch(error => {
                console.error('채팅방 생성 중 오류 발생:', error)
            });
    };

    const handleDeleteRoom = (roomId) => {
        axios.delete(`/intalk/chatrooms/${roomId}/`)
            .then(() => {setChatRooms(prev => prev.filter(room => room.id !== roomId));})
            .catch(error => {
                console.error('채팅방 삭제 중 오류 발생:', error)
            });
        }
    
    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setIsBeginChatOpen(false);
        }
    }
    
    useEffect(() => {
        if (isBeginChatOpen || isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isBeginChatOpen]);
    
    
    return (
        <div className="chat-container">
            <div className="chat-room-list">
                <h1>채팅방 목록</h1>
                <div className='chat-room-option'>
                    <Link to='/' className='option-button' style={{textDecoration: "none"}}>Home</Link>
                    <button className='option-button' onClick={() => setIsBeginChatOpen(true)}>새 채팅방 등록</button>
                    <button className='option-button' onClick={() => setIsProfileOpen(true)}>프로필 설정</button>
                    <button className='option-button'>채팅방 설정</button>
                </div>
                <div>
                    <ul>
                        {chatRooms.map(room => (
                            <li key={room.id}>
                                <Link to={`/intalk/room/${room.name}`} >{room.name}</Link>
                                <button className='chat-delete-button'>설정</button>
                                <button className='chat-delete-button' onClick={() => handleDeleteRoom(room.id)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    
            {isBeginChatOpen && (
                <div className='beginChat-popup'>
                    <div className='beginChat-popup-content' ref={popupRef}>
                        <div id='popup-part1'>
                            <label>이름:</label>
                            <input 
                                type="text"
                                value={newRoomName}
                                onChange={e => setNewRoomName(e.target.value)}
                                placeholder="새 채팅방 이름"
                            ></input>
                        </div>                            
                        <div id='popup-buttonbox'>
                            <button id='popup-button' onClick={handleCreateRoom}>생성</button>
                            <button id='popup-button' onClick={() => setIsBeginChatOpen(false)}>돌아가기</button>
                        </div>
                    </div>
                </div>
            )}

            {isProfileOpen && (
                <div className='beginChat-popup'>
                    <div className='beginChat-popup-content' ref={popupRef}>
                    <h2>프로필 설정</h2>
                        <div id='popup-part1'>
                            <label>이름:</label>
                            <input
                                type="text"
                                value={newRoomName}
                            ></input>
                        </div>                            
                        <div id='popup-buttonbox'>
                            <button id='popup-button'>생성</button>
                            <button id='popup-button'onClick={() => setIsProfileOpen(false)}>돌아가기</button>
                        </div>
                    </div>
                </div>    
            )}
        </div>
    );
}

export default ChatList;