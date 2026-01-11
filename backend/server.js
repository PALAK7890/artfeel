import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import blogRoutes from "./routes/blog.js"
import notificationRoutes from "./routes/inbox.js"
import userRoutes from "./routes/user.js"

dotenv.config()
const app = express()

app.use(cors({
  origin: "https://artfeel.vercel.app",
  credentials: true
}));

// ❗ DO NOT put express.json() before multer routes
app.use(express.json())
app.use("/api/blog", blogRoutes)



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.use("/api/auth", authRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/user", userRoutes)

// serve uploaded images
app.use("/uploads", express.static("uploads"))

app.listen(8080, () => {
  console.log("Server running on 8080")
})
