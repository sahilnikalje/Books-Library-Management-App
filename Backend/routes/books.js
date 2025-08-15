const express = require("express")
const Book = require("../models/Book")

const router = express.Router()

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({ availability: true })
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
