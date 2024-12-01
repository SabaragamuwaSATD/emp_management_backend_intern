const mongoose = require("mongoose");
const { assign } = require("nodemailer/lib/shared");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  jobRole: {
    type: String,
    required: false,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  project: {
    type: String,
    required: false,
  },
  assignDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

taskSchema.pre("save", async function (next) {
  if (this.employeeId) {
    const Employee = mongoose.model("Employee");
    const employee = await Employee.findById(this.employeeId);

    if (employee) {
      this.name = employee.name;
      this.jobRole = employee.jobRole;
    }
  }
});

taskSchema.pre("save", async function (next) {
  if (this.projectId) {
    const Project = mongoose.model("Project");
    const project = await Project.findById(this.projectId);

    if (project) {
      this.project = project.projectName;
    }
  }
  next();
});

const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;
