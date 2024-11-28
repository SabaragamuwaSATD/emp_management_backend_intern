const express = require("express");
const {
  addProject,
  allProjects,
  projectById,
  deleteProject,
  updatedProject,
  searchProject,
} = require("../controllers/projectController");
const router = express.Router();

router.post("/add", addProject);
router.get("/search", searchProject);
router.get("/", allProjects);
router.get("/:id", projectById);
router.put("/:id", updatedProject);
router.delete("/:id", deleteProject);

module.exports = router;
