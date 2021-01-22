const mongoose = require("mongoose");
const {Book} = require("../models/Book.model");

module.exports.getAvailableBooks = async (req, res) => {
    let books = await Book.find().or([
        {inStock: {$gte: 1}},
        {copiesInStock: {$gte: 1}},
    ]);
    res.send(books);
};

module.exports.borrowBook = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (book) {
        if (book.inStock > 0) {
            book.inStock -= 1;
            const updatedBookStock = await book.save();
            res.status(200).send({message: "Book Borrowed!", availableItems: updatedBookStock.inStock});
        } else {
            res.status(404).send({message: `No More Available Items of the Book "${book.title}" In Stock!`})
        }
    } else {
        res.status(404).send({message: "Book Not Found!"});
    }
};

module.exports.borrowBookCopy = async (req, res) => {
    const bookCopyId = req.params.id;
    const bookCopy = await Book.findById(bookCopyId);
    if (bookCopy) {
        if (bookCopy.copiesInStock > 0) {
            bookCopy.copiesInStock -= 1;
            const updatedCopiesStock = await bookCopy.save();
            res.status(200).send({message: "Copy Borrowed!", availableCopies: updatedCopiesStock.copiesInStock});
        } else {
            res.status(404).send({message: `No More Available Copies of the Book "${bookCopy.title}" In Stock!`})
        }
    } else {
        res.status(500).send({message: "Book Not Found!"});
    }
};

module.exports.returnBook = async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (book) {
        book.inStock += 1;
        const updatedBookStock = await book.save();
        res.status(200).send({message: "Book Returned!", availableItems: updatedBookStock.inStock});
    } else {
        res.status(404).send({message: "Book Not Found!"});
    }
};

module.exports.returnBookCopy = async (req, res) => {
    const bookCopyId = req.params.id;
    const bookCopy = await Book.findById(bookCopyId);
    if (bookCopy) {
        bookCopy.copiesInStock += 1;
        const updatedCopiesStock = await bookCopy.save();
        res.status(200).send({message: "Copy Returned!", availableCopies: updatedCopiesStock.copiesInStock});
    } else {
        res.status(500).send({message: "Book Not Found!"});
    }
};
