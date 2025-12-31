import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import blogRoutes from'./routes/blog.js'
import notificationRoutes from './routes/inbox.js'
import userRoutes from './routes/user.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.use("/api/auth", authRoutes)
app.use("/api/blog",blogRoutes )
app.use("/api/notifications", notificationRoutes)
app.use("/api/user", userRoutes)

app.listen(8080, () => {
  console.log("Server running on 8080")
});
