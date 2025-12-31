import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  image: String, desc: String,
  authorName: String,  authorEmail: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
comments: [ { userName: String, text: String, createdAt: { type: Date, default: Date.now } } ]
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
