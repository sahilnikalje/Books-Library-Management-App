const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const authRoutes = require("./routes/auth")
const bookRoutes = require("./routes/books")
const myBooksRoutes = require("./routes/myBooks")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/mybooks", myBooksRoutes)

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Books Library API is running!" })
})

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/books-library")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
