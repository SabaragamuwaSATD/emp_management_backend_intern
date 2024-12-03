const express = require("express");
const { signup } = require("../controllers/authController");
const router = express.Router();

router.put("/signup", signup);

module.exports = router;
