import express from "express";
import Blog from "../models/blog.js";
import Notification from "../models/notifications.js";
import auth from "../middlewares/profileauth.js";

const router = express.Router();

router.post("/", async (req,res)=>{
  const blog = await Blog.create({
    image: req.body.image,
    desc: req.body.desc,
    authorName: req.user.name,
    authorEmail: req.user.email
  });
  res.json(blog);
});

router.get("/", async (req,res)=>{
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.get("/email/:email", async (req,res)=>{
  const blogs = await Blog.find({ authorEmail: req.params.email });
  res.json(blogs);
});

router.post("/like/:id", auth, async (req,res)=>{
  const blog = await Blog.findById(req.params.id);

  const alreadyLiked = blog.likes.includes(req.user.id);

  if (alreadyLiked) {
    blog.likes.pull(req.user.id);
  } else {
    blog.likes.push(req.user.id);

    await Notification.create({
      userEmail: blog.authorEmail,
      fromUser: req.user.name,
      type: "like",
      blogId: blog._id
    });
  }

  await blog.save();
  res.json(blog);
});

router.post("/comment/:id", auth, async (req,res)=>{
  const blog = await Blog.findById(req.params.id);

  blog.comments.push({
    userName: req.user.name,
    text: req.body.text
  });

  await Notification.create({
    userEmail: blog.authorEmail,
    fromUser: req.user.name,
    type: "comment",
    blogId: blog._id
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

export default router;
