"use client"
import { useDispatch } from "react-redux"
import { updateBookStatus, updateBookRating } from "../store/slices/myBooksSlice"

const MyBookCard = ({ myBook }) => {
  const dispatch = useDispatch()
  const { bookId, status, rating } = myBook

  const handleStatusChange = (newStatus) => {
    dispatch(updateBookStatus({ bookId: bookId._id, status: newStatus }))
  }

  const handleRatingChange = (newRating) => {
    dispatch(updateBookRating({ bookId: bookId._id, rating: newRating }))
  }

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => handleRatingChange(star)}
        className={`text-2xl ${
          star <= (rating || 0) ? "text-yellow-400" : "text-gray-300"
        } hover:text-yellow-400 transition-colors`}
      >
        ★
      </button>
    ))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={bookId.coverImage || "/placeholder.svg"} alt={bookId.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{bookId.title}</h3>
        <p className="text-gray-600 mb-4">by {bookId.author}</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Reading Status:</label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Read">Read</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
          <div className="flex space-x-1">{renderStars()}</div>
        </div>
      </div>
    </div>
  )
}

export default MyBookCard
