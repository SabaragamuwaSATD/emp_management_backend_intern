const express = require("express");
const {
  signin,
  signout,
  ForgotPassword,
  VerifyOTP,
  ResetPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signin", signin);
router.get("/signout", signout);
router.post("/forgot-password", ForgotPassword);
router.post("/verify-otp", VerifyOTP);
router.post("/reset-password", ResetPassword);

module.exports = router;
