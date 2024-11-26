const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: false,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    enum: ["frontend", "backend"],
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientTelNo: {
    type: String,
    required: true,
  },
  assignDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  handedDate: {
    type: Date,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
