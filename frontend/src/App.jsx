import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import TodoApp from './file/TodoApp';
import DoneTodolist from './file/DoneTodolist';
import AddTodolist from './file/AddTodolist';
import EditTodo from './file/EditTodo';

const App = () => {
    const location = useLocation();

    return (
        <div className="container">
            <nav className="nav-links">
                {location.pathname === '/' &&
                    <Link to="/AddTodolist" className="rounded-link">Add todo</Link>
                }
                {location.pathname === '/' && 
                    <Link to="/DoneTodolist" className="rounded-link">완료한 todo 목록</Link>}
                {location.pathname !== '/' &&
                    <Link to="/">뒤로가기</Link>}
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/" element={<TodoApp />} />
                    <Route path="/AddTodolist" element={<AddTodolist />} />
                    <Route path="/DoneTodolist" element={<DoneTodolist />} />
                    <Route path="/edit/:id" element={<EditTodo />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;