const express = require("express");
const {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
} = require("../controllers/empController");
const { upload } = require("../configs/cloudinaryConfig");
const router = express.Router();

router.post("/add", upload.single("photo"), addEmployee);
router.delete("/delete/:id", deleteEmployee);
router.get("/", getAllEmployees);

module.exports = router;
