import express from "express"
import Book from "../models/Book.js"

const router = express.Router()

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ availability: true }).sort({ createdAt: -1 })
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
