import express from "express";
import Book from "../models/Book.js";
import Review from "../models/Review.js";
const router = express.Router();

// Create a book
router.post("/books", async (req, res) => {
    const { title, author, description, image } = req.body;
    console.log(req.body);
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


// Get book details
router.get("/book/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        const reviews = await Review.find({ book: req.params.id }).populate("user","name").populate("book","title");
        res.status(200).json({ message: "Book fetched successfully", book: [book] ,reviews});
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

export default router;