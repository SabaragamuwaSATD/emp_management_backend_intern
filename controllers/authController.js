const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { sendOTPEmail } = require("../utills/emailService");
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

//forgot password.......................
exports.ForgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // Generate a random OTP (6 digits)
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  };

  try {
    const user = await Employee.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    // Generate OTP
    const otp = generateOTP();

    // Hash the OTP and save to the user (for security reasons)
    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");
    user.resetPasswordOTP = hashedOTP;
    user.resetPasswordExpires = Date.now() + 3600000; // OTP expires in 1 hour
    user.otpVerified = false;
    await user.save();

    // Send OTP via email
    await sendOTPEmail(user.email, otp);

    res.status(200).json({
      success: true,
      data: user,
      message: "OTP sent to email for password reset",
    });
  } catch (error) {
    next(error);
  }
};

// otp verificaton...............................
exports.VerifyOTP = async (req, res, next) => {
  const { otp } = req.body;

  try {
    // Hash the provided OTP to compare it with the stored hashed OTP
    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    // Find the user by OTP and check its validity
    const user = await Employee.findOne({
      resetPasswordOTP: hashedOTP,
      resetPasswordExpires: { $gt: Date.now() }, // Check if OTP is still valid
    });

    if (!user) {
      console.log(hashedOTP);
      // console.log(resetPasswordExpires);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Flag the user as OTP verified (e.g., add a field in the database)
    user.otpVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "OTP verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

//reset password...............................
exports.ResetPassword = async (req, res, next) => {
  const { newPassword } = req.body;

  try {
    // Find the user based on the resetPasswordOTP and check OTP expiry
    const user = await Employee.findOne({
      otpVerified: true,
    });

    if (!user) {
      return res.status(400).json({ message: "OTP verfied required" });
    }

    // Hash the new password and update the user's password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;

    // Clear the OTP and expiry fields
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    user.otpVerified = false;

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: "password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
