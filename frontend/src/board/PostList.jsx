import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from '../Axios/tokenAxios';
import Logout from './Logout';
import Cookies from 'js-cookie';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const accessToken = Cookies.get('access') || localStorage.getItem('access_token');
            if (accessToken) {
                setIsLoggedIn(true);
                axios.defaults.headers['Authorization'] = 'Bearer ' + accessToken;
            }
        };
        checkLoginStatus();
    }, []);

    useEffect(() => {
        axios.get('/board/posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('포스트 fetching 과정에서 에러 발생', error);
            });
    }, []);

    return (
        <div>
            <div id='boardhome'>
                <Link to='/' id='parts'>Home</Link>
                {isLoggedIn ? (
                    <>
                        <p id='parts-username'>로그인됨</p>
                        <Link to="/board/new" id='parts'>새 포스트</Link>
                        <Logout id='parts' setIsLoggedIn={setIsLoggedIn}/>                
                    </>
                ) : (
                    <>
                        <p id='parts-username'>로그인 필요</p>
                        <Link to="/board/login" id='parts'>로그인</Link>
                        <Link to="/board/register" id='parts'>회원가입</Link>
                    </>
                )}
            </div>
            <div id="post-list-container">
                <h1 id="post-list-title">Posts</h1>
                <ul id="post-list">
                    {posts.slice().reverse().map(post => (
                        <li key={post.id} id="post-item">
                            <Link to={`/board/posts/${post.id}`} className="post-title">{post.title}</Link>
                            <p className="post-author">By {post.author_username}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PostList;