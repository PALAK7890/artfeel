import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userEmail: String,
  fromUser: String,
  type: String, 
  blogId: mongoose.Schema.Types.ObjectId,
  read: { type: Boolean, default: false }
},{timestamps:true})

const Notification = mongoose.model("Notification", notificationSchema)
export default Notification