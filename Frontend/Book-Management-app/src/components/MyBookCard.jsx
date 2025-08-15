"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Star, Trash2 } from "lucide-react"
import { updateBookStatus, updateBookRating, removeFromMyBooks } from "../store/slices/myBooksSlice"
import toast from "react-hot-toast"

const MyBookCard = ({ myBook }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const dispatch = useDispatch()

  const statusOptions = ["Want to Read", "Currently Reading", "Read"]

  const handleStatusChange = async (newStatus) => {
    if (newStatus === myBook.status) return

    setIsUpdating(true)
    try {
      await dispatch(
        updateBookStatus({
          bookId: myBook.bookId._id,
          status: newStatus,
        }),
      ).unwrap()
      toast.success("Status updated!")
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRatingChange = async (rating) => {
    if (rating === myBook.rating) return

    setIsUpdating(true)
    try {
      await dispatch(
        updateBookRating({
          bookId: myBook.bookId._id,
          rating,
        }),
      ).unwrap()
      toast.success("Rating updated!")
    } catch (error) {
      toast.error("Failed to update rating")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    if (!confirm("Are you sure you want to remove this book from your library?")) {
      return
    }

    try {
      await dispatch(removeFromMyBooks(myBook.bookId._id)).unwrap()
      toast.success("Book removed from library")
    } catch (error) {
      toast.error("Failed to remove book")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Want to Read":
        return "bg-blue-100 text-blue-800"
      case "Currently Reading":
        return "bg-yellow-100 text-yellow-800"
      case "Read":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="card p-4">
      <div className="flex space-x-4">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <img
            src={myBook.bookId.coverImage || "/placeholder.svg"}
            alt={myBook.bookId.title}
            className="w-20 h-28 object-cover rounded-lg"
          />
        </div>

        {/* Book Details */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{myBook.bookId.title}</h3>
            <p className="text-gray-600 text-sm">by {myBook.bookId.author}</p>
          </div>

          {/* Status Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reading Status</label>
            <select
              value={myBook.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isUpdating}
              className="input-field text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  disabled={isUpdating}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-5 w-5 ${
                      star <= (myBook.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Status Badge and Remove Button */}
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(myBook.status)}`}>
              {myBook.status}
            </span>

            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
              title="Remove from library"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBookCard
