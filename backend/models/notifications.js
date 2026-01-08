import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // receiver
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who liked/commented
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  type: { type: String, enum: ["like", "comment"] },
  message: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});
const Notification = mongoose.model("Notification", notificationSchema)
export default Notification