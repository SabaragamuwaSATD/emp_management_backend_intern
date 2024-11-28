const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  incomeReportID: {
    type: String,
    required: true,
  },
  report: {
    url: { type: String },
    public_id: { type: String },
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  income: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
  },
});

// Middleware to auto-fill clientName before saving
incomeSchema.pre("save", async function (next) {
  if (this.projectId) {
    const Project = mongoose.model("Project");
    const project = await Project.findById(this.projectId);

    if (project) {
      this.clientName = project.clientName;
    }
  }
  next();
});

const Income = new mongoose.model("Income", incomeSchema);
module.exports = Income;
