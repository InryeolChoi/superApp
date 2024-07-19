import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../Axios/simpleAxios';
import './DoneTodolist.css'

const DoneTodoList = () => {
    const [donetodos, setDonetodos] = useState([])
    const navigate = useNavigate();

    const handleback = () => {
        navigate('/list')
    }

    useEffect(() => {
        axios.get('/list/done/')
            .then(response => {setDonetodos(response.data)})
            .catch(error => {console.error('fetching 과정에서 에러가 났습니다!', error)})
    }, []);

    const handleDeleteAll = () => {
        axios.delete('/list/done/')
            .then(response => {setDonetodos([]);})
            .catch(error => {
                console.error('delete 완료된 항목 과정에서 에러가 났습니다!', error);
            });
    };

    return (
        <div id='done-todo-list'>
            <button id='back' onClick={
                () => handleback()
            }>뒤로가기</button>
            <h2>완료된 할일 목록</h2>
            <button className="delete-all-button" onClick={handleDeleteAll}>모두 삭제</button>
            <ul className="done-todo-list">
                {donetodos.map(done => (
                    <li key={done.id} className="done-todo-item">
                        {done.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DoneTodoList;