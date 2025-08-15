import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import booksSlice from "./slices/booksSlice"
import myBooksSlice from "./slices/myBooksSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    books: booksSlice,
    myBooks: myBooksSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})
