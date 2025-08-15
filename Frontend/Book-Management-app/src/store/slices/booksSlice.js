import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api"

// Async thunks
export const fetchBooks = createAsyncThunk("books/fetchBooks", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/books")
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch books")
  }
})

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.books = action.payload
        state.error = null
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default booksSlice.reducer
