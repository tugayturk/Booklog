import express from "express";
import Book from "../models/Book.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
const router = express.Router();

// Create a book
router.post("/books", async (req, res) => {
    const { title, author, description, image } = req.body;
    try {
        const book = await Book.findOne({ title });
        if (book) {
            return res.status(400).json({ message: "Book already exists" });
        }


        const newBook = await Book.create({ title, author, description, image });

        res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        console.error("Book creation error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get all books
router.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get sorted books
router.get("/books/sorted", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Search books - MUST be before /book/:id route
router.get("/book/search", async (req, res) => {
    try {
        const { title } = req.query;

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title parameter is required" });
        }

        const books = await Book.find({ title: { $regex: title.trim(), $options: "i" } });
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get book details
router.get("/book/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        const reviews = await Review.find({ book: req.params.id }).populate("user", "name").populate("book", "title");
        res.status(200).json({ message: "Book fetched successfully", book: [book], reviews });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Create books reviews
router.post("/book/:id/review", async (req, res) => {
    try {
        const { review, rating, user } = req.body;
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const newReview = await Review.create({
            review,
            rating,
            book: book._id,
            user,
        });

        // Initialize reviews array if it doesn't exist
        if (!book.reviews) {
            book.reviews = [];
        }

        book.reviews.push(newReview._id);
        await book.save();

        res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
        console.error("Review creation error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

// Get books reviews
router.get("/book/:id/reviews", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("reviews");
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const reviews = book.reviews;
        res.status(200).json({ message: "Reviews fetched successfully", reviews });
    } catch (error) {
        console.error("Review fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Add book to library
router.post("/book/:id/library", async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.params.id;
        console.log(req.body);
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ DUPLICATE CHECK
        if (user.library.includes(book._id)) {
            return res
                .status(409)
                .json({ message: "Book already exists in library" });
        }
        user.library.push(book._id);
        await user.save();
        res.status(200).json({ message: "Book added to library successfully" });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Remove book from library
router.delete("/book/:id/library", async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        user.library = user.library.filter(
            id => id.toString() !== bookId
        );

        await user.save();
        res.status(200).json({ message: "Book removed from library successfully" });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Get user library
router.get("/user/:id/library", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("library");
        res.status(200).json({ message: "Library fetched successfully", library: user.library });
    } catch (error) {
        console.error("Library fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default router;