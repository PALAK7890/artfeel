import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/explore.css";
import { FaHeart, FaCommentDots } from "react-icons/fa";


export default function Explore() {
  const user = JSON.parse(localStorage.getItem("user"))
const email = user?.email
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false); 
 const [reaction, setReaction] = useState("");


  const navigate = useNavigate();

 
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/blog`)
    .then(res => res.json())
    .then(data => setPosts(data))
}, [])

  // Like blog
  const likeBlog = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/like/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const updated = await res.json();

    setPosts(posts.map(p => p._id === updated._id ? updated : p));
    setSelectedPost(updated);
setReaction("like");
setTimeout(() => setReaction(""), 1200);


  };

  // Comment
const postComment = async () => {
  if (posting) return;
  setPosting(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/comment/${selectedPost._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ comment: commentText })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Comment failed");
      setPosting(false);
      return;
    }

    setSelectedPost(data);
    setPosts(posts.map(p => p._id === data._id ? data : p));
    setCommentText("");

setReaction("comment");
setTimeout(() => setReaction(""), 1200);


  } catch (err) {
    alert("Server error");
  }

  setPosting(false);
};


  const deletePost = async (id) => {
  if (!window.confirm("Delete this post?")) return

  try {
    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error || "Delete failed")
      return
    }

    // remove from UI
    setPosts(posts.filter(p => p._id !== id))
    setSelectedPost(null)

  } catch (err) {
    alert("Server error")
  }
}


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
                   <FaHeart className="stat-icon heart" /> {post.likes?.length || 0}
<FaCommentDots className="stat-icon comment" /> {post.comments?.length || 0}

                    {post.authorEmail === email && (
  <span
    className="delete-btn"
    onClick={(e) => {
      e.stopPropagation()
      deletePost(post._id)
    }}
  >
    🗑
  </span>
)}
                  </div>

                  <span
                    className="author"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (post.authorEmail) {
  navigate(`/user/${post.authorEmail}`)
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
            <span className="close-btn" onClick={() => setSelectedPost(null)}>✕</span>

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
                <span>
  <FaHeart /> {selectedPost.likes?.length || 0}
</span>
<span>
  <FaCommentDots /> {selectedPost.comments?.length || 0}
</span>

              </div>

              <div className="comments">
                {selectedPost.comments?.map((c, i) => (
                  <p key={i}><b>{c.userName}</b>: {c.text}</p>
                ))}
              </div>

              <div className="comment-box">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button 
  onClick={postComment}
  disabled={!commentText.trim()}
>
  Post
</button>
              </div>
            </div>
          </div>
        </div>
      )}
    {reaction && (
  <div className={`reaction-float ${reaction}`}>
    {reaction === "like" ? <div className="heart"></div> : <div className="comment-bubble"></div>}
  </div>
)}



    </div>
  );
}
