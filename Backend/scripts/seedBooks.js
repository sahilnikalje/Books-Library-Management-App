const mongoose = require("mongoose")
const Book = require("../models/Book")
require("dotenv").config()

const sampleBooks = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverImage: "https://placehold.co/300x300/FF5733/FFFFFF?text=The+Pragmatic+Programmer",
    availability: true,
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    coverImage: "https://placehold.co/300x300/3498DB/FFFFFF?text=Clean+Code",
    availability: true,
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    coverImage: "https://placehold.co/300x300/2ECC71/FFFFFF?text=JavaScript+Good+Parts",
    availability: true,
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    coverImage: "https://placehold.co/300x300/E74C3C/FFFFFF?text=You+Dont+Know+JS",
    availability: true,
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    coverImage: "https://placehold.co/300x300/9B59B6/FFFFFF?text=Design+Patterns",
    availability: true,
  },
]

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/books-library")

    // Clear existing books
    await Book.deleteMany({})

    // Insert sample books
    await Book.insertMany(sampleBooks)

    console.log("Books seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding books:", error)
    process.exit(1)
  }
}

seedBooks()
