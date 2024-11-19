const express = require("express");
const { addEmployee, deleteEmployee } = require("../controllers/empController");
const { upload } = require("../configs/cloudinaryConfig");
const router = express.Router();

router.post("/add", upload.single("photo"), addEmployee);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
