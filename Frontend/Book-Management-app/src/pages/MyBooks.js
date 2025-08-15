"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchMyBooks } from "../store/slices/myBooksSlice"
import MyBookCard from "../components/MyBookCard"

const MyBooks = () => {
  const { books, loading, error } = useSelector((state) => state.myBooks)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    dispatch(fetchMyBooks())
  }, [dispatch, isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl text-gray-600">Loading your books...</div>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Books</h1>

      {books.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          You haven't added any books yet. Visit the{" "}
          <button onClick={() => navigate("/")} className="text-blue-600 hover:text-blue-800 underline">
            home page
          </button>{" "}
          to discover books!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((myBook) => (
            <MyBookCard key={myBook._id} myBook={myBook} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBooks
