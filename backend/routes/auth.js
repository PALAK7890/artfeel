import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/register", async (req,res)=>{
  const {name,email,password} = req.body;

  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({ name, email, password: hashed });

  res.json("Registered");
});


router.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token, user });
});

export default router;
