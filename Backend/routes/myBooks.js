const express = require("express")
const MyBook = require("../models/MyBook")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user's books
router.get("/", auth, async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user._id }).populate("bookId", "title author coverImage")
    res.json(myBooks)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Add book to user's list
router.post("/:bookId", auth, async (req, res) => {
  try {
    const { bookId } = req.params

    // Check if book already exists in user's list
    const existingBook = await MyBook.findOne({
      userId: req.user._id,
      bookId: bookId,
    })

    if (existingBook) {
      return res.status(400).json({ message: "Book already in your list" })
    }

    const myBook = new MyBook({
      userId: req.user._id,
      bookId: bookId,
    })

    await myBook.save()
    await myBook.populate("bookId", "title author coverImage")

    res.status(201).json(myBook)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update reading status
router.patch("/:bookId/status", auth, async (req, res) => {
  try {
    const { bookId } = req.params
    const { status } = req.body

    const validStatuses = ["Want to Read", "Currently Reading", "Read"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const myBook = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId: bookId },
      { status },
      { new: true },
    ).populate("bookId", "title author coverImage")

    if (!myBook) {
      return res.status(404).json({ message: "Book not found in your list" })
    }

    res.json(myBook)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update rating
router.patch("/:bookId/rating", auth, async (req, res) => {
  try {
    const { bookId } = req.params
    const { rating } = req.body

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" })
    }

    const myBook = await MyBook.findOneAndUpdate(
      { userId: req.user._id, bookId: bookId },
      { rating },
      { new: true },
    ).populate("bookId", "title author coverImage")

    if (!myBook) {
      return res.status(404).json({ message: "Book not found in your list" })
    }

    res.json(myBook)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
