const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const setupSwagger = require("./configs/swaggerConfig");

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json
app.use(bodyParser.json()); // for parsing json bodies
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // for enabling CORS for all requests
app.use(morgan("dev")); // for logging requests

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Photographer Backend API");
});

// Handle errors (404, etc.)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
