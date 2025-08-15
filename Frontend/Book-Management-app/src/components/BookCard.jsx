"use client"

import { useSelector, useDispatch } from "react-redux"
import { Plus, Check } from "lucide-react"
import { addToMyBooks } from "../store/slices/myBooksSlice"
import toast from "react-hot-toast"

const BookCard = ({ book }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { myBooks } = useSelector((state) => state.myBooks)
  const dispatch = useDispatch()

  const isInMyBooks = myBooks.some((myBook) => myBook.bookId._id === book._id)

  const handleAddToMyBooks = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add books to your library")
      return
    }

    if (isInMyBooks) {
      toast.info("Book is already in your library")
      return
    }

    try {
      await dispatch(addToMyBooks(book._id)).unwrap()
      toast.success("Book added to your library!")
    } catch (error) {
      toast.error(error.message || "Failed to add book")
    }
  }

  return (
    <div className="card p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg">
        <img src={book.coverImage || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm">by {book.author}</p>

        {book.description && <p className="text-gray-500 text-xs line-clamp-2">{book.description}</p>}

        <button
          onClick={handleAddToMyBooks}
          disabled={isInMyBooks}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            isInMyBooks ? "bg-green-100 text-green-700 cursor-not-allowed" : "btn-primary hover:bg-primary-700"
          }`}
        >
          {isInMyBooks ? (
            <>
              <Check className="h-4 w-4" />
              <span>In Library</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Want to Read</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default BookCard
