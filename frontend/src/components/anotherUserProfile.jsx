import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/profile.css";
import.meta.env.VITE_API_URL

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
  // fetch user profile
  fetch(`${import.meta.env.VITE_API_URL}/api/user/email/${username}`)
    .then(res => res.json())
    .then(data => setUser(data));

  // fetch user blogs
  fetch(`${import.meta.env.VITE_API_URL}/api/blog/email/${username}`)
    .then(res => res.json())
    .then(data => setBlogs(data));
}, [username]);

  return (
    <div className="profile-wrapper">

      <div className="profile-top">
        <div className="profile-pic">
            {user.avatar ? (
    <img
      src={
        user.avatar.startsWith("http")
          ? user.avatar
          : `${import.meta.env.VITE_API_URL}${user.avatar}`
      }
      className="avatar-img"
    />
  ) : (
    <span className="avatar-letter">
      {user.name?.[0] || "A"}
    </span>
  )}
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>
          <span>{user.age} • Artist</span>
          <p>{user.bio}</p>
        </div>
      </div>

      <h3 className="section-title">Creations</h3>

      <div className="profile-gallery">
        {blogs.map((blog) => (
          <div className="art-box" key={blog._id}>
            <img src={`${import.meta.env.VITE_API_URL}${blog.image}`} />

          </div>
        ))}
      </div>

    </div>
  );
}
