const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./configs/database");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

dotenv.config();
