const express = require("express");
const { signup, signin } = require("../controllers/authController");
const router = express.Router();

router.put("/signup", signup);
router.post("/signin", signin);

module.exports = router;
