"use client";

import { useEffect, useState } from "react";

export default function UserPosts({ userEmail, searchTerm }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                const filtered = data.filter(
                    post =>
                        post.email === userEmail &&
                        post.location?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setPosts(filtered);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, [userEmail, searchTerm]);

    return (
        <div className="posts-container">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <div className="post-header">
                            <h3>{post.title}</h3>
                        </div>

                        <div className="post-body">
                            <p><strong>Location:</strong> {post.location}</p>
                            <p><strong>Description:</strong> {post.description}</p>
                        </div>

                        <div className="post-footer">
                            {/* Add any footer content or buttons here */}
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-posts">No posts found.</p>
            )}

            <style jsx>{`
                .posts-container {
                    padding: 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
                    gap: 30px;
                }

                .post-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    overflow: hidden;
                    box-sizing: border-box;
                    transition: box-shadow 0.3s ease;
                }

                .post-card:hover {
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
                }

                .post-header {
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 8px;
                }

                .post-header h3 {
                    margin-top: 0;
                    font-size: 1.2rem;
                    color: #333;
                }

                .post-body p {
                    margin: 5px 0;
                    color: #666;
                    font-size: 1rem;
                }

                .post-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }

                .no-posts {
                    text-align: center;
                    padding: 20px;
                    font-size: 1rem;
                    color: #666;
                }
            `}</style>
        </div>
    );
}
