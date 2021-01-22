const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bookController = require("../controllers/Book.controller");

const bookRouter = express.Router();

bookRouter.get("/stock", expressAsyncHandler(bookController.getAvailableBooks));
bookRouter.put("/:id", expressAsyncHandler(bookController.borrowBook));
bookRouter.put("/:id/copy", expressAsyncHandler(bookController.borrowBookCopy));
bookRouter.put("/:id/return", expressAsyncHandler(bookController.returnBook));
bookRouter.put("/:id/copyreturn", expressAsyncHandler(bookController.returnBookCopy));

module.exports = bookRouter;
