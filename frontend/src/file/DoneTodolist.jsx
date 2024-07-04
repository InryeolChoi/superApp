import React, { useState, useEffect } from "react";
import axios from './axiosConfig';

const DoneTodoList = () => {
    const [donetodos, setDonetodos] = useState([])

    useEffect(() => {
        axios.get('/done/')
            .then(response => {setDonetodos(response.data)})
            .catch(error => {console.error('fetching 과정에서 에러가 났습니다!', error)})
    }, []);

    const handleDeleteAll = () => {
        axios.delete('/done/')
            .then(response => {setDonetodos([]);})
            .catch(error => {
                console.error('delete 완료된 항목 과정에서 에러가 났습니다!', error);
            });
    };

    return (
        <div className='done-todo-list'>
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