const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose
    .connect(process.env.MONGODB_URL || "mongodb://localhost/bookstore-hexad", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .then(err => {
        console.log("Failed to connect to MongoDB...", err);
        process.exit();
    });

//Not existing Route
app.use((req, res, next) => {
    next(createError(404));
})

// error handling
app.use(function (err, req, res, next) {
    res.locals.message = err.message;

    res.status(err.status || 500).send(err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Serving at http://localhost:${port}.`));

module.exports.port = port;
module.exports = app;
