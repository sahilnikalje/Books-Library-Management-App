import mongoose from "mongoose"
import dotenv from "dotenv"
import Book from "../models/Book.js"

dotenv.config()

const sampleBooks = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverImage: "https://placehold.co/300x400/FF5733/FFFFFF?text=The+Pragmatic+Programmer",
    availability: true,
    description: "Your journey to mastery",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    coverImage: "https://placehold.co/300x400/3498DB/FFFFFF?text=Clean+Code",
    availability: true,
    description: "A Handbook of Agile Software Craftsmanship",
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    coverImage: "https://placehold.co/300x400/F39C12/FFFFFF?text=JavaScript+Good+Parts",
    availability: true,
    description: "Unearthing the Excellence in JavaScript",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    coverImage: "https://placehold.co/300x400/E74C3C/FFFFFF?text=You+Dont+Know+JS",
    availability: true,
    description: "Up & Going",
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    coverImage: "https://placehold.co/300x400/9B59B6/FFFFFF?text=Design+Patterns",
    availability: true,
    description: "Elements of Reusable Object-Oriented Software",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    coverImage: "https://placehold.co/300x400/1ABC9C/FFFFFF?text=Refactoring",
    availability: true,
    description: "Improving the Design of Existing Code",
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
