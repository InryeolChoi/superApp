import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Axios/simpleAxios';
import './AddTodolist.css';

const AddTodolist = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [important, setImportant] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleback = () => {
        navigate('/list')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTodo = {title, description, important};

        axios.post('/list/todo/', newTodo)
            .then(response => {
                setMessage('새 할일이 성공적으로 추가되었습니다!');
                setTitle('');
                setDescription('');
                setImportant(false);
                navigate('/list');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setMessage('제목과 설명은 모두 채워져 있어야 합니다.');
                } else {
                    setMessage('할일 추가 과정에서 에러가 났습니다.');
                }
            });
    };

    return (
        <div>
            <button className='back' onClick={() => handleback()}>뒤로가기</button>
            <h1>Add Todo</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="할일 제목"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">설명:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="할일 설명"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="important">중요여부:</label>
                    <input
                        type="checkbox"
                        id="important"
                        checked={important}
                        onChange={(e) => setImportant(e.target.checked)}
                    />
                </div>
                <button className='submit' type="submit">추가</button>
            </form>
        </div>
    );
};

export default AddTodolist;