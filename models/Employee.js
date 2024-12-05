const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    public_id: { type: String },
    url: { type: String },
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  telNo: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  bankNo: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
    // enum: [
    //   "Fullstack Developer",
    //   "Frontend Developer",
    //   "Backend Developer",
    //   "Director",
    //   "Manager",
    //   "CEO",
    //   "UI/UX Designer",
    //   "Project Manager",
    // ],
  },
  startWorkDate: {
    type: Date,
    required: true,
  },
  endWorkDate: {
    type: Date,
  },
  password: {
    type: String,
    required: false,
  },
  otp: {
    type: String,
    required: false,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
