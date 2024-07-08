import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "../axiosConfig";
import Logout from './Logout';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const isLoggedIn = !!localStorage.getItem('access_token');

    useEffect(() => {
        axios.get('/board/posts/')
            .then(response => {setPosts(response.data);})
            .catch(error => {
                console.error('There was an error fetching the posts!', error);
            });
    }, []);

    return (
        <div>
            <div id='boardhome'>
                <Link to='/' className='parts'>Home</Link>
                <Link to="/board" className='parts'>Board</Link>
                {isLoggedIn && <Link to="/board/new" className='parts'>새 포스트</Link>}
                {isLoggedIn ? (
                    <Logout className='parts' />
                ) : (
                    <>
                        <Link to="/board/login" className='parts'>로그인</Link>
                        <Link to="/board/register" className='parts'>회원가입</Link>
                    </>
                )}
            </div>
            <div id="post-list-container">
                <h1 id="post-list-title">Posts</h1>
                <ul id="post-list">
                    {posts.map(post => (
                        <li key={post.id} id="post-item">
                            <Link to={`/board/posts/${post.id}`} className="post-title">{post.title}</Link>
                            <p className="post-content">{post.content}</p>
                            <p className="post-author">By {post.author_username}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PostList;