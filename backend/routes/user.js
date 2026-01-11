import express from "express";
import User from "../models/user.js";
import auth from "../middlewares/profileauth.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.get("/email/:email", async (req,res)=>{
  const user = await User.findOne({ email: req.params.email }).select("-password");
  res.json(user);
});
router.get("/profile", auth, async (req, res) => {
  try {
    res.json(req.user); // comes from auth middleware
  } catch (err) {
    res.status(500).json({ error: "Failed to load profile" });
  }
});
router.put(
  "/profile",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = req.user   // MongoDB user from auth middleware

      if (req.file) {
        user.avatar = req.file.path   // Cloudinary URL
      }

      user.name = req.body.name
      user.age = req.body.age
      user.bio = req.body.bio

      await user.save()
      res.json(user)

    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Profile update failed" })
    }
  }
)

export default router;