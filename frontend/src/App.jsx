import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import TodoApp from './todolist/TodoApp';
import DoneTodolist from './todolist/DoneTodolist';
import AddTodolist from './todolist/AddTodolist';
import EditTodo from './todolist/EditTodo';
import HomeApp from './home/HomeApp'
import './App.css'

const App = () => {
    const location = useLocation();

    return (
        <div className="container">
            <div>
                {location.pathname === '/list' && 
                    <Link to="/" className='home-link'>home</Link>}
            </div>
            <div>
                <nav className="nav-links">
                    {location.pathname === '/list' &&
                        <Link to="/list/AddTodolist" className="rounded-link">Add todo</Link>
                    }
                    {location.pathname === '/list' && 
                        <Link to="/list/DoneTodolist" className="rounded-link">완료한 todo 목록</Link>}
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomeApp />} />
                        <Route path="/list" element={<TodoApp />} />
                        <Route path="/list/AddTodolist" element={<AddTodolist />} />
                        <Route path="/list/DoneTodolist" element={<DoneTodolist />} />
                        <Route path="/list/edit/:id" element={<EditTodo />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;