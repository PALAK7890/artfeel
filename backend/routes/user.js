import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/email/:email", async (req,res)=>{
  const user = await User.findOne({ email: req.params.email }).select("-password");
  res.json(user);
});

export default router;