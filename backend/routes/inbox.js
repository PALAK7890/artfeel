import express from "express";
import Notification from "../models/notifications.js";
import auth from "../middlewares/profileauth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const notes = await Notification.find({ userEmail: req.user.email })
    .sort({ createdAt: -1 });

  res.json(notes);
});

export default router;
