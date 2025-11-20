import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
      enum: ["English", "Tamil", "Sinhala"],
    },

    category: {
      type: String,
      required: true,
      enum: [
         "O/L-Books",
        "A/L-Books",
        "Story Books",
        "Self Development",
        "Programming",
      ],
    },

    stockStatus: {
      type: String,
      required: true,
      enum: ["Available", "Unavailable","Low Stock"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("books", bookSchema);
