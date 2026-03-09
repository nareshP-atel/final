import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/apiService';
import './Community.css';

const Community = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        tags: []
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await apiService.getCommunityPosts();
            if (response.success) {
                setPosts(response.posts);
            }
        } catch (error) {
            console.error('Fetch posts error:', error);
            toast.error('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.createPost({
                ...newPost,
                userId: user._id
            });

            if (response.success) {
                toast.success('Post created successfully');
                setNewPost({ title: '', content: '', tags: [] });
                await fetchPosts();
            }
        } catch (error) {
            console.error('Create post error:', error);
            toast.error('Failed to create post');
        }
    };

    return (
        <div className="community-container">
            <div className="community-header">
                <h1>Community Space</h1>
                <p>Share your thoughts and connect with others</p>
            </div>

            <div className="community-content">
                <div className="post-form-container">
                    <h2>Create a Post</h2>
                    <form onSubmit={handlePostSubmit} className="post-form">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newPost.title}
                            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                            required
                            className="post-input"
                        />
                        <textarea
                            placeholder="Share your thoughts..."
                            value={newPost.content}
                            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                            required
                            className="post-textarea"
                        />
                        <div className="form-footer">
                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                onChange={(e) => setNewPost({
                                    ...newPost,
                                    tags: e.target.value.split(',').map(tag => tag.trim())
                                })}
                                className="post-input"
                            />
                            <button type="submit" className="submit-btn">Share Post</button>
                        </div>
                    </form>
                </div>

                <div className="posts-section">
                    {loading ? (
                        <div className="loading">Loading posts...</div>
                    ) : (
                        <div className="posts-grid">
                            {posts.map(post => (
                                <div key={post._id} className="post-card">
                                    <div className="post-header">
                                        <h3>{post.title}</h3>
                                        <span className="post-author">
                                            By {post.author?.username || 'Anonymous'}
                                        </span>
                                    </div>
                                    <div className="post-body">
                                        <p>{post.content}</p>
                                    </div>
                                    <div className="post-footer">
                                        <div className="post-tags">
                                            {post.tags.map((tag, index) => (
                                                <span key={index} className="tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="post-stats">
                                            <span>
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Community;