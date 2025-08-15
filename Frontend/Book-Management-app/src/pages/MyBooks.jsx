"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import MyBookCard from "../components/MyBookCard"
import LoadingSpinner from "../components/LoadingSpinner"
import { fetchMyBooks } from "../store/slices/myBooksSlice"

const MyBooks = () => {
  const dispatch = useDispatch()
  const { myBooks, loading, error } = useSelector((state) => state.myBooks)
  const [filter, setFilter] = useState("All")

  const statusOptions = ["All", "Want to Read", "Currently Reading", "Read"]

  useEffect(() => {
    dispatch(fetchMyBooks())
  }, [dispatch])

  const filteredBooks = filter === "All" ? myBooks : myBooks.filter((book) => book.status === filter)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner text="Loading your books..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error loading your books: {error}</p>
        <button onClick={() => dispatch(fetchMyBooks())} className="btn-primary mt-4">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">My Books ({myBooks.length})</h1>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-auto">
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {filter === "All"
              ? "You haven't added any books to your library yet."
              : `No books with status "${filter}".`}
          </p>
          {filter === "All" && <p className="text-gray-500 mt-2">Go to the home page to discover and add books!</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((myBook) => (
            <MyBookCard key={myBook._id} myBook={myBook} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBooks
