const express = require("express");
const { signup, signin, signout } = require("../controllers/authController");
const router = express.Router();

router.put("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
