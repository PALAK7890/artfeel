import React, { useState } from "react";
import "../style/uploadBlog.css";

export default function UploadBlog() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="blog-upload">

      <div className="top-section">

        {/* LEFT – Title + meta */}
        <div className="blog-meta">
          <input type="text" placeholder="Blog Title" />
          <input type="text" placeholder="Author name" />
          <input type="text" placeholder="Tags (art, design...)" />
        </div>

        {/* RIGHT – Image */}
        <div className="blog-image">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <div className="img-placeholder">Upload cover image</div>
          )}
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>

      </div>

      {/* BOTTOM – Blog content */}
      <textarea
        className="blog-content"
        placeholder="Write your blog here..."
      ></textarea>

      <button className="publish-btn">Publish Blog</button>

    </div>
  );
}
