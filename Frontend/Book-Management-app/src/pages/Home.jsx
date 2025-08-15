"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BookCard from "../components/BookCard"
import LoadingSpinner from "../components/LoadingSpinner"
import { fetchBooks } from "../store/slices/booksSlice"
import { fetchMyBooks } from "../store/slices/myBooksSlice"

const Home = () => {
  const dispatch = useDispatch()
  const { books, loading, error } = useSelector((state) => state.books)
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchBooks())
    if (isAuthenticated) {
      dispatch(fetchMyBooks())
    }
  }, [dispatch, isAuthenticated])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner text="Loading books..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error loading books: {error}</p>
        <button onClick={() => dispatch(fetchBooks())} className="btn-primary mt-4">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My Library</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing books, track your reading progress, and rate your favorites.
          {!isAuthenticated && " Sign up to start building your personal library!"}
        </p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No books available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
