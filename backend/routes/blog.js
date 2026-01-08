import express from "express";
import Blog from "../models/blog.js";
import Notification from "../models/notifications.js";
import auth from "../middlewares/profileauth.js";
import upload from '../middlewares/upload.js'

const router = express.Router();

router.post(
  "/",
  auth,
  upload.single("image"),
  async (req, res) => {

    const imageUrl = `/uploads/${req.file.filename}`;

    const blog = await Blog.create({
       image: req.file.path,    
      desc: req.body.desc,
      title: req.body.title,
      tags: req.body.tags,
      authorName: req.user.name,
      authorEmail: req.user.email
    });

    res.json(blog);
  }
);

router.get("/", async (req,res)=>{
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.get("/email/:email", async (req,res)=>{
  const blogs = await Blog.find({ authorEmail: req.params.email });
  res.json(blogs);
});

router.post("/like/:id", auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog.likes.includes(req.user.id)) {
    blog.likes.push(req.user.id);
  }

  await blog.save();

  if (blog.authorEmail !== req.user.email) {
    await Notification.create({
      userEmail: blog.authorEmail,   // 👈 receiver
      sender: req.user.name,
      post: blog._id,
      type: "like",
      message: "liked your post"
    });
  }

  res.json(blog);
});

router.post("/comment/:id", auth, async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.comments.push({
      userName: req.user.name,
      text: comment
    });

    if (blog.authorEmail !== req.user.email) {
      await Notification.create({
        userEmail: blog.authorEmail,
        sender: req.user.name,
        post: blog._id,
        type: "comment",
        message: "commented on your post"
      });
    }

    await blog.save();
    res.json(blog);

  } catch (err) {
    console.error("COMMENT ERROR:", err);
    res.status(500).json({ error: "Failed to post comment" });
  }
});



router.get("/featured", async (req,res)=>{
  const blogs = await Blog.aggregate([
    {
      $addFields: { likeCount: { $size: "$likes" } }
    },
    {
      $sort: { likeCount: -1, createdAt: -1 }
    },
    {
      $limit: 6
    }
  ]);

  res.json(blogs);
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" })
    }

    // Only author can delete
    if (blog.authorEmail !== req.user.email) {
      return res.status(403).json({ error: "Not allowed" })
    }

    await blog.deleteOne()
    res.json({ message: "Deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Delete failed" })
  }
})
router.get("/notifications", auth, async (req, res) => {
  const data = await Notification.find({ userEmail: req.user.email })
    .populate("post", "title")
    .sort({ createdAt: -1 });

  res.json(data);
});

export default router;
