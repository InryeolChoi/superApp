import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import TodoApp from './TodoApp';
import DoneTodolist from './DoneTodolist';
import AddTodolist from './AddTodolist';
import EditTodo from './EditTodo';
import './TodoHome.css';

const TodoHome = () => {
    const location = useLocation();

    return (
        <div className="todo-home-container">
            <nav className="nav-links">
                {location.pathname === '/list' && 
                    <Link to="/" className='rounded-link'>home</Link>}
                {location.pathname === '/list' &&
                    <Link to="/list/AddTodolist" className="rounded-link">Add todo</Link>
                }
                {location.pathname === '/list' && 
                    <Link to="/list/DoneTodolist" className="rounded-link">완료한 todo 목록</Link>}
            </nav>
            <div className="route-content">
                <Routes>
                    <Route path="/" element={<TodoApp />} />
                    <Route path="/AddTodolist" element={<AddTodolist />} />
                    <Route path="/DoneTodolist" element={<DoneTodolist />} />
                    <Route path="/edit/:id" element={<EditTodo />} />
                </Routes>
            </div>
        </div>
    )
}

export default TodoHome;