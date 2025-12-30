import "../style/profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: storedUser?.name || "Artist"
  });

  const [showEdit, setShowEdit] = useState(false);

  const blogs = [];

const saveProfile = async () => {
  const res = await fetch("http://localhost:8080/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(user)
  });

  const data = await res.json();

  localStorage.setItem("user", JSON.stringify(data));
  setUser(data);
  setShowEdit(false);
};

  return (
    <div className="profile-wrapper">


      <div className="profile-top">
        <div className="profile-pic">
          {user.name[0]}
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>
          <span>{user.age} • Artist</span>
          <p>{user.bio}</p>

          <button className="edit-btn" onClick={() => setShowEdit(true)}>
            Edit Profile ✏️
          </button>
          <button
  className="edit-btn"
  style={{ marginLeft: "10px" }}
  onClick={() => navigate("/inbox")}
>
  Inbox 🔔
</button>
        </div>
        
      </div>

      {/* Creations */}
      <h3 className="section-title">My Creations</h3>

      {blogs.length === 0 ? (
        <div className="no-posts">
          <p>You haven't shared any art yet.</p>
          <button onClick={() => navigate("/upload")}>
            Add your creations 🎨
          </button>
        </div>
      ) : (
        <div className="profile-gallery">
          {blogs.map((blog) => (
            <div className="art-box" key={blog._id}>
              <img src={blog.image} />
            </div>
          ))}
        </div>
      )}

      {/* Edit Popup */}
      {showEdit && (
        <div className="edit-overlay">
          <div className="edit-box">
            <h3>Edit Profile</h3>

            <input
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Age"
              value={user.age}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />

            <textarea
              placeholder="Bio"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />

            <div className="edit-actions">
              <button onClick={saveProfile}>Save</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
