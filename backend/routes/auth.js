import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middlewares/profileauth.js";
const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json(user);
  } catch (err) {
    res.status(500).json("Server error");
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});
router.put("/profile", auth, async (req, res) => {
     console.log("Profile update hit", req.userId)
  const { name, age, bio, profileImage } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    { name, age, bio, profileImage },
    { new: true }
  );

  res.json(user);
});

export default router;
