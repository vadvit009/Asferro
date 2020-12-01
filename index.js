require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  Books
} = require("./src/api/routes");

// parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.disable("x-powered-by");

// access cors (temporary)
app.use(cors());

app.use(
  "/api/v1", Books
);

// handle 404 (user errors)
app.use((req, res, next) => {
  res.status(404).send(`<h2>Oops 404</h2> <h3>We think you are lost!</h3>`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server starting on port ${process.env.PORT}`);
});
