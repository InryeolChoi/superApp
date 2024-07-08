import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import './PostDetail.css'; // CSS 파일 임포트

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const isLoggedIn = !!localStorage.getItem('access_token');

    useEffect(() => {
        axios.get(`/board/posts/${id}/`)
            .then(response => {
                setPost(response.data);
                setEditTitle(response.data.title);
                setEditContent(response.data.content);
            })
            .catch(error => {console.error('fetching 과정에서 에러가 발생했습니다.', error)});
    }, [id]);

    const handleDelete = () => {
        axios.delete(`/board/posts/${id}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(() => {
                navigate('/board');
            })
            .catch(error => {
                console.error('삭제 과정에서 에러가 발생했습니다.', error);
            });
    };

    const handleEdit = () => {
        const updatedPost = {
            title: editTitle,
            content: editContent
        };
        axios.put(`/board/posts/${id}/`, updatedPost, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
            })
            .then(response => {
                setPost(response.data);
                setIsEditOpen(false);
            })
            .catch(error => {
                alert('수정 과정에서 에러가 발생했습니다.', error);
            });
    };

    if (!post) return <div>Loading...</div>;
    return (
        <div className="post-detail-container">
            <div>
                <Link to='/board'>뒤로가기</Link>
            </div>
            <div>
                <h1 className="post-detail-title">{post.title}</h1>
                <p className="post-detail-content">{post.content}</p>
                <p className="post-detail-author">By {post.author}</p>
                {isLoggedIn && (
                    <div>
                        <button className="delete-button" onClick={handleDelete}>삭제</button>
                        <button className="edit-button" onClick={() => setIsEditOpen(true)}>수정</button>
                    </div>
                )}
            </div>

            {isEditOpen && (
                <div className="edit-popup">
                    <div className="edit-popup-content">
                        <h2>수정하기</h2>
                        <label>제목:</label>
                        <input 
                            type="text" 
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label>내용:</label>
                        <textarea 
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        ></textarea>
                        <button onClick={handleEdit}>저장</button>
                        <button onClick={() => setIsEditOpen(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostDetail;