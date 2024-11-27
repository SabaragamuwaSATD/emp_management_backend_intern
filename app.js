const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const setupSwagger = require("./configs/swaggerConfig");
const empRoutes = require("./routes/empRoutes");
const clientRoutes = require("./routes/clientRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const projectRoutes = require("./routes/projectRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json
app.use(bodyParser.json()); // for parsing json bodies
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({ origin: "http://localhost:5173" })); // for enabling CORS for all requests
app.use(morgan("dev")); // for logging requests

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Photographer Backend API");
});

app.use("/api/v1/employees", empRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/partners", partnerRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/incomes", incomeRoutes);

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
