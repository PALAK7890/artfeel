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
  const [avatar, setAvatar] = useState(null);
const [preview, setPreview] = useState(storedUser?.avatar || null);
const [saving, setSaving] = useState(false);
  const blogs = [];


const saveProfile = async () => {
  const token = localStorage.getItem("token");
  setSaving(true); // start loader

  const formData = new FormData();
  formData.append("name", user.name || "");
  formData.append("age", user.age || "");
  formData.append("bio", user.bio || "");

  if (avatar) {
    formData.append("image", avatar);
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    setShowEdit(false);
  } catch (err) {
    alert("Failed to save profile");
  }

  setSaving(false); // stop loader
};



  return (
    <div className="profile-wrapper">


      <div className="profile-top">
       <div className="profile-pic">
  {preview ? (
    <img src={preview} className="avatar-img" />
  ) : (
    <span className="avatar-letter">{user?.name?.[0] || "A"}</span>
  )}
</div>



        <div className="profile-info">
          <h2>{user?.name || "Artist"}</h2>
<span>{user?.age || "?"} • Artist</span>
<p>{user?.bio || ""}</p>

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
            <div className="edit-avatar">
  <img
    src={preview || "/default-avatar.png"}
    className="edit-avatar-img"
  />

  <label className="edit-upload-btn">
    Change Photo
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setPreview(URL.createObjectURL(file));
      }}
    />
  </label>
</div>


            <div className="edit-actions">
              <button onClick={saveProfile} disabled={saving}>  {saving ? "Saving..." : "Save"}</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
