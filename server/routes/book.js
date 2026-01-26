import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

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

router.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.get("/books/sorted", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (error) {
        console.error("Book fetching error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

export default router;