import mongoose from "mongoose"

const myBookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["Want to Read", "Currently Reading", "Read"],
      default: "Want to Read",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Ensure user can't add same book twice
myBookSchema.index({ userId: 1, bookId: 1 }, { unique: true })

export default mongoose.model("MyBook", myBookSchema)
