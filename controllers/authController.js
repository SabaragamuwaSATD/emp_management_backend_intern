const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utills/hashPassword");

// Employee Sign Up
exports.signup = async (req, res, next) => {
  const { employeeId, password } = req.body;

  if (!employeeId || !password) {
    return res
      .status(400)
      .json({ message: "Please provide employeeId and password" });
  }

  try {
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(400).json({ message: "You are not a employee" });
    }

    employee.password = await hashPassword(password);
    await employee.save();

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    res.status(200).json({
      success: true,
      token,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};
