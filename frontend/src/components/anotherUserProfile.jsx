import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/profile.css";
import.meta.env.VITE_API_URL

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blog/api/user/${username}`)
      .then(res => res.json())
      .then(data => setUser(data));

    fetch(`${import.meta.env.VITE_API_URL}/api/blog/api/blog/username/${username}`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, [username]);

  return (
    <div className="profile-wrapper">

      <div className="profile-top">
        <div className="profile-pic">
          {user.name?.[0]}
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
            <img src={blog.image} />
          </div>
        ))}
      </div>

    </div>
  );
}
