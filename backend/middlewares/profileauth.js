import jwt from "jsonwebtoken"
import User from "../models/user.js"

export default async function profileauth(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = await User.findById(decoded.id)

    next()

  } catch (err) {
    console.error(err)
    res.status(401).json({ message: "Invalid token" })
  }
}
