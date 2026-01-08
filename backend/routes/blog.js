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

  blog.likes.push(req.user.id);
  await blog.save();

  if (blog.user.toString() !== req.user.id) {
    await Notification.create({
      user: blog.user,       // post owner
      sender: req.user.id,   // who liked
      post: blog._id,
      type: "like",
      message: "liked your post"
    });
  }

  res.json(blog);
});

router.post("/comment/:id", auth, async (req,res)=>{
  const blog = await Blog.findById(req.params.id);

  blog.comments.push({
    userName: req.user.name,
    text: req.body.text
  });
await Notification.create({
  user: blog.user,
  sender: req.user.id,
  post: blog._id,
  type: "comment",
  message: "commented on your post"
});

  await blog.save();
  res.json(blog);
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
  const data = await Notification.find({ user: req.user.id })
    .populate("sender", "name")
    .populate("post", "title")
    .sort({ createdAt: -1 });

  res.json(data);
});



export default router;
