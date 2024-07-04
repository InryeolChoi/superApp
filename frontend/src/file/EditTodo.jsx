import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';

const EditTodo = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [important, setImportant] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/todo/${id}/`)
            .then(response => {
                const todo = response.data;
                setTitle(todo.title);
                setDescription(todo.description);
                setImportant(todo.important);
            })
            .catch(error => {
                console.error('할일 정보를 가져오는 과정에서 에러가 났습니다!', error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const updatedTodo = {
            title,
            description,
            important
        };
    
        axios.put(`/todo/${id}/`, updatedTodo)
            .then(response => {
                setMessage('할일이 성공적으로 수정되었습니다!');
                navigate('/');  // 수정 후 메인 페이지로 이동
            })
            .catch(error => {
                console.error('할일 수정 과정에서 에러가 났습니다!', error);
                setMessage('할일 수정 과정에서 에러가 났습니다.');
            });
    };

    return (
        <div>
            <h1>수정하기</h1>
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
                <button type="submit">수정</button>
            </form>
        </div>
    )
}

export default EditTodo;