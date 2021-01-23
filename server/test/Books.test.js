const {Book} = require("../models/Book.model");
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../server");
const {booksList} = require("../database/booksList");

describe("api/books", () => {
    beforeEach(async () => {
        await Book.deleteMany({});
    });

    describe("GET /stock", () => {
        it("should return list of books in stock", async () => {
            const books = [...booksList];
            await Book.insertMany(books);
            console.log(books);
            const res = await request(app).get("/api/books/stock");
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(7);
        });
    });

    describe("PUT /:id", () => {
        it("should decrement number of books in stock", async () => {
            const book = new Book(booksList[0]);
            await book.save();
            expect(book.inStock).to.equal(2);

            const res = await request(app).put(`/api/books/${book._id}`);
            console.log(res.body);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("availableItems", 1);
        });

        it("should return no more available books in stock", async () => {
            const book = new Book(booksList[4]);
            await book.save();
            expect(book.inStock).to.equal(0);

            const res = await request(app).put(`/api/books/${book._id}`);
            console.log(res.body);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property(
                "message",
                `No More Available Items of the Book "${book.title}" In Stock!`
            );
        });

        it("should return book not found", async () => {
            const res = await request(app).put("/api/books/9999999999");
            expect(res.status).to.equal(500);
        });
    });

    describe("PUT /:id/copy", () => {
        it("should decrement number of copies in stock", async () => {
            const book = new Book(booksList[0]);
            await book.save();
            expect(book.copiesInStock).to.equal(3);

            const res = await request(app).put(`/api/books/${book._id}/copy`);
            console.log(res.body);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("availableCopies", 2);
        });

        it("should return no more available copies in stock", async () => {
            const book = new Book(booksList[7]);
            await book.save();
            expect(book.copiesInStock).to.equal(0);

            const res = await request(app).put(`/api/books/${book._id}/copy`);
            console.log(res.body);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property(
                "message",
                `No More Available Copies of the Book "${book.title}" In Stock!`
            );
        });

        it("should return book not found", async () => {
            const res = await request(app).put("/api/books/9999999999/copy");
            expect(res.status).to.equal(500);
        });
    });

    describe("PUT /:id/return", () => {
        it("should increment number of books in stock", async () => {
            const book = new Book(booksList[1]);
            await book.save();
            expect(book.inStock).to.equal(5);

            const res = await request(app).put(`/api/books/${book._id}/return`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("availableItems", 6);
        });

        it("should return book does not belong to this library", async () => {
            const res = await request(app).put("/api/books/9999999999/return");
            expect(res.status).to.equal(500);
        });
    });

    describe("PUT /:id/copyreturn", () => {
        it("should increment number of copies in stock", async () => {
            const book = new Book(booksList[7]);
            await book.save();
            expect(book.copiesInStock).to.equal(0);

            const res = await request(app).put(`/api/books/${book._id}/copyreturn`);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("availableCopies", 1);
        });

        it("should return book copy does not belong to this library", async () => {
            const res = await request(app).put("/api/books/9999999999/copyreturn");
            expect(res.status).to.equal(500);
        });
    });
});
