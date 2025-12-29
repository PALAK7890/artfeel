import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },

  bio:String,
  age:Number,
    profileImage:String,

});

export default mongoose.model("User", userSchema);
