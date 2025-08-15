"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBooks } from "../store/slices/booksSlice"
import BookCard from "../components/BookCard"

const Home = () => {
  const { books, loading, error } = useSelector((state) => state.books)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl text-gray-600">Loading books...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Discover Books</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default Home
