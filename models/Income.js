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
  projectName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  clientName: {
    type: String,
  },
});

// Middleware to auto-fill clientName before saving
incomeSchema.pre("save", async function (next) {
  if (this.projectName) {
    const Project = mongoose.model("Project");
    const project = await Project.findById(this.projectName);

    if (project) {
      this.clientName = project.clientName;
    }
  }
  next();
});

const Income = new mongoose.model("Income", incomeSchema);
module.exports = Income;
