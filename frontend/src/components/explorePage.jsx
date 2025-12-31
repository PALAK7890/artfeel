import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/explore.css";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  // Fetch all blogs for Explore
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blog`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // Like blog
  const likeBlog = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/like/${id}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    const updated = await res.json();

    setPosts(posts.map(p => p._id === updated._id ? updated : p));
    setSelectedPost(updated);
  };

  // Comment
  const postComment = async () => {
    if (!commentText) return;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/blog/comment/${selectedPost._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ text: commentText })
      }
    );

    const updated = await res.json();
    setSelectedPost(updated);
    setCommentText("");
  };

  return (
    <div className="explore-page">

      <div className={selectedPost ? "blur-bg" : ""}>
        <h2 className="explore-title">Explore</h2>

        <div className="explore-grid">
          {posts.map((post) => (
            <div
              className="explore-card"
              key={post._id}
              onClick={() => setSelectedPost(post)}
            >
              <img src={post.image} className="card-img" />

              <div className="card-info">
                <p>{post.desc}</p>

                <div className="card-bottom">
                  <div className="stats">
                    ❤️ {post.likes.length} 💬 {post.comments.length}
                  </div>

                  <span
                    className="author"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user/${post.authorEmail}`);
                    }}
                  >
                    @{post.authorName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="modal-overlay">
          <div className="modal-card">
            <span className="close-btn" onClick={() => setSelectedPost(null)}>✕</span>

            <img src={selectedPost.image} />

            <div className="modal-content">
              <p>{selectedPost.desc}</p>

              <div className="modal-actions">
                <span onClick={() => likeBlog(selectedPost._id)}>
                  ❤️ {selectedPost.likes.length}
                </span>
                <span>💬 {selectedPost.comments.length}</span>
              </div>

              <div className="comments">
                {selectedPost.comments.map((c, i) => (
                  <p key={i}><b>{c.userName}</b>: {c.text}</p>
                ))}
              </div>

              <div className="comment-box">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={postComment}>Post</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
