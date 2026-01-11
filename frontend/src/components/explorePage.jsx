import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/explore.css";
import { FaHeart, FaCommentDots } from "react-icons/fa";

export default function Explore() {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [reaction, setReaction] = useState("");

  const navigate = useNavigate();

  const selectedPost = posts.find(p => p._id === selectedPostId);

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
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const updated = await res.json();

    setPosts(prev =>
      prev.map(p => (p._id === updated._id ? updated : p))
    );

    setReaction("like");
    setTimeout(() => setReaction(""), 1200);
  };

  // Comment
  const postComment = async () => {
    if (posting || !selectedPost) return;
    setPosting(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/comment/${selectedPost._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ comment: commentText })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Comment failed");
        setPosting(false);
        return;
      }

      setPosts(prev =>
        prev.map(p => (p._id === data._id ? data : p))
      );

      setCommentText("");
      setReaction("comment");
      setTimeout(() => setReaction(""), 1200);
    } catch (err) {
      alert("Server error");
    }

    setPosting(false);
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
              onClick={() => setSelectedPostId(post._id)}
            >
              <img
                src={
                  post.image?.startsWith("http")
                    ? post.image
                    : `${import.meta.env.VITE_API_URL}${post.image}`
                }
                className="card-img"
              />

              <div className="card-info">
                <p>{post.desc}</p>

                <div className="card-bottom">
                  <div className="stats">
                    <span
                      className="card-like"
                      onClick={(e) => {
                        e.stopPropagation();
                        likeBlog(post._id);
                      }}
                    >
                      <FaHeart /> {post.likes?.length || 0}
                    </span>

                    <FaCommentDots className="stat-icon comment" />{" "}
                    {post.comments?.length || 0}
                  </div>

                  <span
                    className="author"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (post.authorEmail) {
                        navigate(`/user/${post.authorEmail}`);
                      }
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
            <span className="close-btn" onClick={() => setSelectedPostId(null)}>
              ✕
            </span>

            <img
              src={
                selectedPost.image?.startsWith("http")
                  ? selectedPost.image
                  : `${import.meta.env.VITE_API_URL}${selectedPost.image}`
              }
            />

            <div className="modal-content">
              <p>{selectedPost.desc}</p>

              <div className="modal-actions">
                <span onClick={() => likeBlog(selectedPost._id)} className="modal-like">
                  <FaHeart /> {selectedPost.likes?.length || 0}
                </span>
                <span>
                  <FaCommentDots /> {selectedPost.comments?.length || 0}
                </span>
              </div>

              <div className="comments">
                {selectedPost.comments?.map((c, i) => (
                  <p key={i}>
                    <b>{c.userName}</b>: {c.text}
                  </p>
                ))}
              </div>

              <div className="comment-box">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={postComment} disabled={!commentText.trim()}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {reaction && (
        <div className="reaction-float">
          {reaction === "like" ? (
            <FaHeart className="reaction-heart" />
          ) : (
            <FaCommentDots className="reaction-comment" />
          )}
        </div>
      )}
    </div>
  );
}
