import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema (
    {
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        default: []
    }],
}, { createdAt: true, updatedAt: true })

const Book = mongoose.model('Book', bookSchema);

export default Book;