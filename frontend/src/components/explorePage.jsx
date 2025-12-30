import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/explore.css";

export default function Explore() {
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    desc: "Soft pastel digital painting of a dream girl",
    author: "Palak",
    likes: 120,
    comments: 18,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    desc: "Minimal dark UI design for a blog platform",
    author: "Aarav",
    likes: 92,
    comments: 10,
  },
];
  return (
    <div className="explore-page">

      <div className={selectedPost ? "blur-bg" : ""}>

        <h2 className="explore-title">Explore</h2>

        <div className="explore-grid">
          {posts.map((post) => (
            <div className="explore-card" key={post.id} onClick={() => setSelectedPost(post)}>
              <img src={post.image} className="card-img" />
              <div className="card-info">
                <p>{post.desc}</p>

                <div className="card-bottom">
                  <div className="stats">❤️ {post.likes} 💬 {post.comments}</div>

                  <span
                    className="author"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user/${post.author}`);
                    }}
                  >
                    @{post.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedPost && (
        <div className="modal-overlay">
          <div className="modal-card">

            <span className="close-btn" onClick={() => setSelectedPost(null)}>✕</span>

            <img src={selectedPost.image} />

            <div className="modal-content">
              <p>{selectedPost.desc}</p>

              <div className="modal-actions">
                ❤️ {selectedPost.likes} &nbsp; 💬 {selectedPost.comments}
              </div>

              <input placeholder="Write a comment..." />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
