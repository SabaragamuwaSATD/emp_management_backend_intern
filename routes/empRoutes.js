const express = require("express");
const {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
} = require("../controllers/empController");
const { upload } = require("../configs/cloudinaryConfig");
const router = express.Router();

router.post("/add", upload.single("photo"), addEmployee);
router.delete("/delete/:id", deleteEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);

module.exports = router;
