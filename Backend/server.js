import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"

// Import routes
import authRoutes from "./routes/auth.js"
import bookRoutes from "./routes/books.js"
import myBooksRoutes from "./routes/myBooks.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: process.env.NODE_ENV === "production" ? 100 : 1000, 
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
})

// Middleware
app.use(helmet())
app.use(limiter)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/mybooks", myBooksRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/books-library")
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })
