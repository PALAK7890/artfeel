import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  userEmail: String,    // receiver
  sender: String,      // who did action
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  type: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema)
export default Notification