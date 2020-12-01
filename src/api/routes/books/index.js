const app = require("express").Router();

const {searchBooks} = require("../../controllers/books");

app.post("/search", searchBooks);

module.exports = app;
