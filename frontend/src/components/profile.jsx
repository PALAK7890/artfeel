import "../style/profile.css"
import { useNavigate } from "react-router-dom"
import { useState ,useEffect} from "react"


export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("profile")) || JSON.parse(localStorage.getItem("user")) || {}

  const navigate = useNavigate();

  const [user, setUser] = useState({
  name: storedUser?.name || "",
  age: storedUser?.age || "",
  bio: storedUser?.bio || "",
  avatar: storedUser?.avatar || ""
})

  const [showEdit, setShowEdit] = useState(false)
  const [avatar, setAvatar] = useState(null)
const [preview, setPreview] = useState(storedUser?.avatar || "")
const [saving, setSaving] = useState(false)
  const [blogs, setBlogs] = useState([])

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blog/email/${user.email}`
      )

      const data = await res.json()
      setBlogs(data)
    } catch (err) {
      console.log("Failed to load blogs")
    }
  }

  fetchBlogs()
}, [])




const saveProfile = async () => {
  const token = localStorage.getItem("token")
  setSaving(true)

  const formData = new FormData();
  formData.append("name", user.name || "")
  formData.append("age", user.age || "")
  formData.append("bio", user.bio || "")

  if (avatar) {
    formData.append("image", avatar)
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const data = await res.json()

    localStorage.setItem("profile", JSON.stringify(data))

    setUser(data)
    setPreview(data.avatar)

    setShowEdit(false)
  } catch (err) {
    alert("Failed to save profile")
  }

  setSaving(false)
};
const deleteBlog = async (id) => {
  if (!window.confirm("Delete this post?")) return

  try {
    const token = localStorage.getItem("token")

    await fetch(`${import.meta.env.VITE_API_URL}/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // remove from UI
    setBlogs(blogs.filter((b) => b._id !== id))
  } catch (err) {
    alert("Failed to delete")
  }
}



  return (
    <div className="profile-wrapper">


      <div className="profile-top">
       <div className="profile-pic">
  {preview ? (
<img
  src={
    preview?.startsWith("blob:")
      ? preview
      : preview
        ? preview               // Cloudinary full URL
        : "/default-avatar.png"
  }
  className="avatar-img"
/>



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
  <img
    src={
      blog.image?.startsWith("http")
        ? blog.image
        : `${import.meta.env.VITE_API_URL}${blog.image}`
    }
  />

  <button
    className="delete-post"
    onClick={() => deleteBlog(blog._id)}
  >
    🗑
  </button>
</div>

          ))}
        </div>
      )}

      {showEdit && (
        <div className="edit-overlay">
          <div className="edit-box">
            <h3>Edit Profile</h3>

            <input  type="text"  placeholder="Name"  value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}/>
            <input type="number"  placeholder="Age"  value={user.age}  onChange={(e) => setUser({ ...user, age: e.target.value })}/>
            <textarea  placeholder="Bio"  value={user.bio}  onChange={(e) => setUser({ ...user, bio: e.target.value })}/>

            <div className="edit-avatar">
<img
  src={
    preview?.startsWith("blob:")
      ? preview
      : preview
        ? preview
        : "/default-avatar.png"
  }
  className="edit-avatar-img"
/>




  <label className="edit-upload-btn"> Change Photo
    <input type="file"  accept="image/*"  onChange={(e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setPreview(URL.createObjectURL(file)) }}/>
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
