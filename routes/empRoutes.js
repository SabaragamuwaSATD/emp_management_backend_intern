const express = require("express");
const { addEmployee } = require("../controllers/empController");
const { upload } = require("../configs/cloudinaryConfig");
const router = express.Router();

router.post("/add", upload.single("photo"), addEmployee);

module.exports = router;
