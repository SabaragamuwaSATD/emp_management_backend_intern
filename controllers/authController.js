const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utills/hashPassword");
const bcrypt = require("bcryptjs");

// Function to calculate the expiration time for the token
const getExpirationTime = () => {
  const now = new Date();
  const expiration = new Date();
  expiration.setHours(17, 0, 0, 0); // Set to 5 PM local time

  if (now > expiration) {
    expiration.setDate(expiration.getDate() + 1); // Move to the next day if current time is past 5 PM
  }

  const expiresIn = Math.floor((expiration - now) / 1000); // Calculate the difference in seconds
  return expiresIn;
};

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
      return res.status(400).json({ message: "Please check the Employee ID!" });
    }

    employee.password = await hashPassword(password);
    await employee.save();

    // const expiresIn = getExpirationTime();
    // const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
    //   expiresIn,
    // });

    res.status(200).json({
      success: true,
      message: "Employee Registered successfully",
      // token,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// Employee Sign In
exports.signin = async (req, res, next) => {
  const { employeeId, password } = req.body;

  if (!employeeId || !password) {
    return res
      .status(400)
      .json({ message: "Please provide employeeId and password" });
  }

  try {
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const expiresIn = getExpirationTime();
    const token = jwt.sign(
      { id: employee._id, role: employee.jobRole },
      process.env.JWT_SECRET,
      {
        expiresIn,
      }
    );

    res.status(200).json({
      success: true,
      message: "Employee Logged in successfully",
      token,
      expiresIn,
      // data: employee,
    });
  } catch (error) {
    next(error);
  }
};
