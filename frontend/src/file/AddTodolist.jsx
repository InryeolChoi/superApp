import React, { useState } from 'react';
import axios from './axiosConfig';
import './AddTodolist.css';

const AddTodolist = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [important, setImportant] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTodo = {title, description, important};

        axios.post('/list/todo/', newTodo)
            .then(response => {
                setMessage('새 할일이 성공적으로 추가되었습니다!');
                setTitle('');
                setDescription('');
                setImportant(false);
            })
            .catch(error => {
                console.error('할일 추가 과정에서 에러가 났습니다!', error);
                setMessage('할일 추가 과정에서 에러가 났습니다.');
            });
    };

    return (
        <div>
            <h1>Add Todo</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="할일 제목"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="할일 설명"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="important">Important:</label>
                    <input
                        type="checkbox"
                        id="important"
                        checked={important}
                        onChange={(e) => setImportant(e.target.checked)}
                    />
                </div>
                <button type="submit">추가</button>
            </form>
        </div>
    );
};

export default AddTodolist;