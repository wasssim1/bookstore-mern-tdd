const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bookController = require("../controllers/Book.controller");
const {Book} = require("../models/Book.model");
const {booksList} = require("../../database/booksList");

const bookRouter = express.Router();

bookRouter.get("/seed", expressAsyncHandler(async (req, res) => {
        const seed = await Book.insertMany(booksList);
        res.status(201).send(seed);
    }
));

bookRouter.get("/clear", expressAsyncHandler(async (req, res) => {
        const response = await Book.deleteMany({});
        if (response) {
            res.send({message: "All books were deleted!", response: response});
        } else {
            //todo: failed deletion msg
        }
    }
));

bookRouter.get("/stock", expressAsyncHandler(bookController.getAvailableBooks));
bookRouter.put("/:id", expressAsyncHandler(bookController.borrowBook));
bookRouter.put("/:id/copy", expressAsyncHandler(bookController.borrowBookCopy));
bookRouter.put("/:id/return", expressAsyncHandler(bookController.returnBook));
bookRouter.put("/:id/copyreturn", expressAsyncHandler(bookController.returnBookCopy));

module.exports = bookRouter;
