const {Book} = require("../models/Book.model");

describe("api/books", () => {
    beforeEach(async () => {
        await Book.deleteMany({});
    });

    describe("GET /stock", () => {
        it("should return list of books in stock");
    });

    describe("PUT /:id", () => {
        it("should decrement number of books in stock");

        it("should return no more available books in stock");

        it("should return book not found");
    });

    describe("PUT /:id/copy", () => {
        it("should decrement number of copies in stock");

        it("should return no more available copies in stock");

        it("should return book not found");
    });

    describe("PUT /:id/return", () => {
        it("should increment number of books in stock");

        it("should return book does not belong to this library");
    });

    describe("PUT /:id/copyreturn", () => {
        it("should increment number of copies in stock");

        it("should return book copy does not belong to this library");
    });
});
