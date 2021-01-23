const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const createError = require("http-errors");
const bookRouter = require("./routes/Book.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// connect to mongodb service
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    return mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/bookstore-hexad", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
};

mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`);
    setTimeout(connectWithRetry, 5000);
    // process.exit(-1)
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
});

connectWithRetry().then(() => console.log('========'));

// bookStore api
app.use("/api/books", bookRouter);

const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");
console.log(CLIENT_BUILD_PATH)

// serve static files
app.use(express.static(CLIENT_BUILD_PATH))

// will redirect all the non-api routes to react frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
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

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Serving at http://localhost:${port}.`));

module.exports.port = port;
module.exports = app;
