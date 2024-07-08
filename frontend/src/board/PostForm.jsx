import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = { title, content };
        const token = localStorage.getItem('access_token');

        if (!token) {
            console.error('No access token found');
            return;
        }

        axios.post('/board/posts/', postData, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            .then(response => {
                navigate('/board');
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized: Token might be expired or invalid', error);
                } else {
                    console.error('post 작성중 에러발견', error);
                }
            });
    }

    return (
        <div>
            <Link to='/board'>뒤로가기</Link>
            <h1>새 포스트 만들기</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title: </label>
                    <input type="text" value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required/>
                </div>
                <div>
                    <label>Content :</label>
                    <textarea value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required>
                    </textarea>
                </div>
                <button type='submit'>등록</button>
            </form>
        </div>
    )
}

export default PostForm;