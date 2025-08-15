"use client"
import { useSelector, useDispatch } from "react-redux"
import { addBookToMyList } from "../store/slices/myBooksSlice"

const BookCard = ({ book }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleWantToRead = () => {
    if (!isAuthenticated) {
      alert("Please log in to add books to your list!")
      return
    }

    dispatch(addBookToMyList(book._id))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={book.coverImage || "/placeholder.svg"} alt={book.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-4">by {book.author}</p>
        <button
          onClick={handleWantToRead}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
        >
          Want to Read
        </button>
      </div>
    </div>
  )
}

export default BookCard
