import React, { useState } from "react"
import "../style/uploadBlog.css"
import { useNavigate } from "react-router-dom"
export default function UploadBlog() {
   const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState("")
  const navigate = useNavigate()

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

const publishBlog = async () => {
  if (!image || !content) {
    alert("Please upload image and write something");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("desc", content);
    formData.append("title", title);
    formData.append("tags", tags);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blog`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    navigate("/profile");   

  } catch (err) {
    alert("Something went wrong");
  }
};


  return (
    <div className="blog-upload">

      <div className="top-section">

        <div className="blog-meta">
          <input
  type="text"
  placeholder="Blog Title"
  value={title}
  onChange={(e)=>setTitle(e.target.value)}
/>

<input
  type="text"
  placeholder="Author name"
  disabled
  value={JSON.parse(localStorage.getItem("user"))?.name || ""}
/>

<input
  type="text"
  placeholder="Tags (art, design...)"
  value={tags}
  onChange={(e)=>setTags(e.target.value)}
/>
        </div>
<div className="blog-image">
  {preview ? (
    <img src={preview} alt="preview" />
  ) : (
    <div className="img-placeholder">Upload cover image</div>
  )}

  <button
    className="upload-btn inside"
    onClick={() => document.getElementById("fileInput").click()}
  >
    Choose Image
  </button>
</div>

<input
  id="fileInput"
  type="file"
  accept="image/*"
  onChange={handleImage}
  style={{ display: "none" }}
/>





      </div>

      <textarea
  className="blog-content"
  placeholder="Write your blog here..."
  value={content}
  onChange={(e)=>setContent(e.target.value)}
></textarea>

<button className="publish-btn" onClick={publishBlog}>
  Publish Blog
</button>

    </div>
  );
}
