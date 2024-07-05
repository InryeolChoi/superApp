import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from './axiosConfig';
import './TodoApp.css';
    
const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [deletingTodoId, setDeletingTodoId] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('/list/todo/')
            .then(response => {setTodos(response.data);})
            .catch(error => {console.error('fetching 과정에서 에러가 났습니다!', error);
            });
    }, []);

    const handleComplete = (id) => {
        setDeletingTodoId(id);
        setTimeout(() => {
            axios.put(`/list/todo/${id}/`, { complete: true })
                .then(response => {
                    setTodos(todos.filter(todo => todo.id !== id));
                    })
                .catch(error => {
                    console.error('complete 과정에서 에러가 났습니다!', error);
                });
        }, 500);
    }

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        setDeletingTodoId(id);
        setTimeout(() => {
            axios.delete(`/list/todo/${id}/`)
                .then(response => {
                    setTodos(todos.filter(todo => todo.id !== id));
                })
                .catch(error => {
                    console.error('delete 과정에서 에러가 났습니다!', error);
                });
        }, 500);
    }

    return (
        <div>
            <h2>현재 todolist</h2>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} 
                        className={`todo-item 
                            ${deletingTodoId === todo ? 'fade-out' : ''}
                            ${todo.important ? 'important' : ''}`}>
                        {todo.title}
                        <div>
                            <button className="todo-button" 
                                onClick={() => handleComplete(todo.id)}
                            >
                                완료
                            </button>
                            <button className="todo-button"
                                onClick={() => handleEdit(todo.id)}
                            >
                                수정하기
                            </button>
                            <button className='todo-button'
                                onClick={() => handleDelete(todo.id)}
                            >
                                삭제하기
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoApp;