import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import Login from './Login';
import Register from './Register';

const Board = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/new" element={<PostForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default Board;