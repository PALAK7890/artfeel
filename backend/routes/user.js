import express from "express";
import User from "../models/user.js";
import auth from "../middlewares/profileauth.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.get("/email/:email", async (req,res)=>{
  const user = await User.findOne({ email: req.params.email }).select("-password");
  res.json(user);
});
router.put(
  "/profile",
  auth,
  upload.single("image"),
  async (req, res) => {
    const updates = {
      name: req.body.name,
      age: req.body.age,
      bio: req.body.bio
    };

    if (req.file) {
      updates.avatar = req.file.path; 
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    );

    res.json(user);
  }
);


export default router;