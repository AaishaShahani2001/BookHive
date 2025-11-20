import express from "express";
import Book from "../models/book.js";
import User from "../models/user.js";
import authenticateToken from "../auth/userAuth.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const bookRouter = express.Router();

// Multer to read image file into buffer
const upload = multer({ storage: multer.memoryStorage() });

/* -----------------------------------------
   📌 ADD BOOK (ADMIN ONLY) — Cloudinary Upload
-------------------------------------------- */
bookRouter.post(
  "/add-book",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required." });
      }

      const { title, author, price, desc, language, category, stockStatus } = req.body;

      if (!title || !author || !price || !desc || !language || !category || !stockStatus) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Book image is required" });
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "bookstore/books" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Cloudinary upload failed", error });
          }

          const newBook = new Book({
            url: result.secure_url,
            title,
            author,
            price,
            desc,
            language,
            category,
            stockStatus,
          });

          await newBook.save();

          return res.status(200).json({
            status: "Success",
            message: "Book added successfully",
            data: newBook,
          });
        }
      );

      uploadStream.end(req.file.buffer);

    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
);


/* -----------------------------------------
   📌 UPDATE BOOK — 
-------------------------------------------- */
bookRouter.put(
  "/update-book",
  authenticateToken,
  upload.single("image"), 
  async (req, res) => {
    try {
      const { bookid } = req.headers;

      const user = await User.findById(req.user.id);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required." });
      }

      const book = await Book.findById(bookid);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      let imageUrl = book.url; // keep old image

      // If new image uploaded → upload to Cloudinary
      if (req.file) {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "bookstore/books",
            resource_type: "image",
          },
          async (error, result) => {
            if (error) {
              console.error("Cloudinary update error:", error);
              return res.status(500).json({ message: "Cloudinary upload failed", error });
            }

            imageUrl = result.secure_url;

            const updatedBook = await Book.findByIdAndUpdate(
              bookid,
              {
                url: imageUrl,
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                desc: req.body.desc,
                language: req.body.language,
                category: req.body.category,
                stockStatus: req.body.stockStatus,
              },
              { new: true }
            );

            return res.status(200).json({
              status: "Success",
              message: "Book updated successfully",
              data: updatedBook,
            });
          }
        );

        return uploadStream.end(req.file.buffer);
      }

      // If no image uploaded → only update text fields
      const updatedBook = await Book.findByIdAndUpdate(
        bookid,
        req.body,
        { new: true }
      );

      return res.status(200).json({
        status: "Success",
        message: "Book updated successfully.",
        data: updatedBook,
      });
    } catch (error) {
      console.error("update-book error:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
);

/* -----------------------------------------
   📌 DELETE BOOK
-------------------------------------------- */
bookRouter.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("delete-book error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

/* -----------------------------------------
   📌 GET ALL BOOKS
-------------------------------------------- */
bookRouter.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({ status: "Success", data: books });
  } catch (error) {
    console.error("get-all-books error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

/* -----------------------------------------
   📌 GET RECENT BOOKS (LIMIT 4)
-------------------------------------------- */
bookRouter.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({ status: "Success", data: books });
  } catch (error) {
    console.error("get-recent-books error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

/* -----------------------------------------
   📌 GET SINGLE BOOK BY ID
-------------------------------------------- */
bookRouter.get("/get-a-book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({ status: "Success", data: book });
  } catch (error) {
    console.error("get-a-book error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

export default bookRouter;
