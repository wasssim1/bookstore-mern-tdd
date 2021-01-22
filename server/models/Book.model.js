const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
    },
    inStock: {
        type: Number,
        default: 0,
    },
    copiesInStock: {
        type: Number,
        default: 0,
    },
});

module.exports.Book = mongoose.model("Book", bookSchema);
