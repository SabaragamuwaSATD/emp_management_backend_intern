const express = require("express");
const {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} = require("../controllers/empController");
const { upload } = require("../configs/cloudinaryConfig");
const router = express.Router();

router.post("/add", upload.single("photo"), addEmployee);
router.delete("/delete/:id", deleteEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/update/:id", upload.single("photo"), updateEmployee);

module.exports = router;
