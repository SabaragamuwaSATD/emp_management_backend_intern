const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utills/hashPassword");
const bcrypt = require("bcryptjs");
// const { generateOTP, sendOTP } = require("../utills/otp");
// const textflow = require("textflow.js");
// const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

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
  const { email, name, telNo, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({ message: "Please check the email!" });
    }

    if (employee.password) {
      return res.status(400).json({ message: "Employee already registered!" });
    }

    if (employee.name !== name) {
      return res.status(400).json({ message: "Please check the Name!" });
    }

    if (employee.telNo !== telNo) {
      return res
        .status(400)
        .json({ message: "Please check the Telephone Number!" });
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
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const employee = await Employee.findOne({ email });

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

// Generate and send OTP
// // Use your TextFlow API key
// textflow.useKey(
//   "2GzKpj2yDu1KZf0DQ8cp74TrTkIfrGIVXOSiQwwh55JxyGM9zyUJWGFsZ7dRAiyR"
// );

// // Generate and send OTP
// exports.sendOtp = async (req, res, next) => {
//   const { telNo } = req.body;

//   try {
//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Send OTP using TextFlow
//     let result = await textflow.sendSMS(telNo, `Your OTP code is ${otp}`);

//     if (result.ok) {
//       // Save OTP to the employee record (for demonstration purposes, you might want to use a more secure method)
//       const employee = await Employee.findOneAndUpdate(
//         { telNo },
//         { otp },
//         { new: true }
//       );

//       if (!employee) {
//         return res.status(400).json({ message: "Employee not found" });
//       }

//       res.status(200).json({
//         success: true,
//         message: "OTP sent successfully",
//         data: { telNo },
//       });
//     } else {
//       console.error("Failed to send OTP:", result);
//       res.status(500).json({ message: "Failed to send OTP" });
//     }
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     next(error);
//   }
// };

// Use your Twilio credentials
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// // Generate and send OTP
// exports.sendOtp = async (req, res, next) => {
//   const { telNo } = req.body;

//   try {
//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Send OTP using Twilio
//     const message = await client.messages.create({
//       body: `Your OTP code is ${otp}`,
//       from: "+940701012293", // Replace with your Twilio phone number
//       to: telNo,
//     });

//     if (message.sid) {
//       // Save OTP to the employee record (for demonstration purposes, you might want to use a more secure method)
//       const employee = await Employee.findOneAndUpdate(
//         { telNo },
//         { otp },
//         { new: true }
//       );

//       if (!employee) {
//         return res.status(400).json({ message: "Employee not found" });
//       }

//       res.status(200).json({
//         success: true,
//         message: "OTP sent successfully",
//         data: { telNo },
//       });
//     } else {
//       console.error("Failed to send OTP:", message);
//       res.status(500).json({ message: "Failed to send OTP" });
//     }
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     next(error);
//   }
// };

//Signout...............
exports.signout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Signout successfully",
    });
  } catch (error) {
    next(error);
  }
};
