import express from "express"
import { body, validationResult } from "express-validator"
import MyBook from "../models/MyBook.js"
import Book from "../models/Book.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// Get user's books
router.get("/", authenticate, async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user._id }).populate("bookId").sort({ createdAt: -1 })
    res.json(myBooks)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Add book to user's list
router.post("/:bookId", authenticate, async (req, res) => {
  try {
    const { bookId } = req.params

    // Check if book exists
    const book = await Book.findById(bookId)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    // Check if already added
    const existingMyBook = await MyBook.findOne({
      userId: req.user._id,
      bookId,
    })

    if (existingMyBook) {
      return res.status(400).json({ message: "Book already in your list" })
    }

    // Add book
    const myBook = new MyBook({
      userId: req.user._id,
      bookId,
      status: "Want to Read",
    })

    await myBook.save()
    await myBook.populate("bookId")

    res.status(201).json(myBook)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update reading status
router.patch(
  "/:bookId/status",
  [authenticate, body("status").isIn(["Want to Read", "Currently Reading", "Read"])],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { bookId } = req.params
      const { status } = req.body

      const myBook = await MyBook.findOneAndUpdate(
        { userId: req.user._id, bookId },
        { status },
        { new: true },
      ).populate("bookId")

      if (!myBook) {
        return res.status(404).json({ message: "Book not found in your list" })
      }

      res.json(myBook)
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message })
    }
  },
)

// Update rating
router.patch("/:bookId/rating", [authenticate, body("rating").isInt({ min: 1, max: 5 })], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { bookId } = req.params
    const { rating } = req.body

    const myBook = await MyBook.findOneAndUpdate({ userId: req.user._id, bookId }, { rating }, { new: true }).populate(
      "bookId",
    )

    if (!myBook) {
      return res.status(404).json({ message: "Book not found in your list" })
    }

    res.json(myBook)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Remove book from user's list
router.delete("/:bookId", authenticate, async (req, res) => {
  try {
    const { bookId } = req.params

    const myBook = await MyBook.findOneAndDelete({
      userId: req.user._id,
      bookId,
    })

    if (!myBook) {
      return res.status(404).json({ message: "Book not found in your list" })
    }

    res.json({ message: "Book removed from your list" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
