"use client"

import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout, checkAuth } from "../store/slices/authSlice"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            My Library
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/my-books" className="hover:text-blue-200 transition-colors">
                  My Books
                </Link>
                <span className="text-blue-200">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
