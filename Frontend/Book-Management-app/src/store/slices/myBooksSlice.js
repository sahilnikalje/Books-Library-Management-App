import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

// Async thunks
export const fetchMyBooks = createAsyncThunk("myBooks/fetchMyBooks", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/mybooks")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch your books")
  }
})

export const addToMyBooks = createAsyncThunk("myBooks/addToMyBooks", async (bookId, { rejectWithValue }) => {
  try {
    const response = await api.post(`/mybooks/${bookId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to add book")
  }
})

export const updateBookStatus = createAsyncThunk(
  "myBooks/updateBookStatus",
  async ({ bookId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/mybooks/${bookId}/status`, { status })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status")
    }
  },
)

export const updateBookRating = createAsyncThunk(
  "myBooks/updateBookRating",
  async ({ bookId, rating }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/mybooks/${bookId}/rating`, { rating })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update rating")
    }
  },
)

export const removeFromMyBooks = createAsyncThunk("myBooks/removeFromMyBooks", async (bookId, { rejectWithValue }) => {
  try {
    await api.delete(`/mybooks/${bookId}`)
    return bookId
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to remove book")
  }
})

const myBooksSlice = createSlice({
  name: "myBooks",
  initialState: {
    myBooks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch My Books
      .addCase(fetchMyBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyBooks.fulfilled, (state, action) => {
        state.loading = false
        state.myBooks = action.payload
        state.error = null
      })
      .addCase(fetchMyBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add to My Books
      .addCase(addToMyBooks.fulfilled, (state, action) => {
        state.myBooks.push(action.payload)
      })
      // Update Status
      .addCase(updateBookStatus.fulfilled, (state, action) => {
        const index = state.myBooks.findIndex((book) => book.bookId._id === action.payload.bookId._id)
        if (index !== -1) {
          state.myBooks[index] = action.payload
        }
      })
      // Update Rating
      .addCase(updateBookRating.fulfilled, (state, action) => {
        const index = state.myBooks.findIndex((book) => book.bookId._id === action.payload.bookId._id)
        if (index !== -1) {
          state.myBooks[index] = action.payload
        }
      })
      // Remove from My Books
      .addCase(removeFromMyBooks.fulfilled, (state, action) => {
        state.myBooks = state.myBooks.filter((book) => book.bookId._id !== action.payload)
      })
  },
})

export default myBooksSlice.reducer
