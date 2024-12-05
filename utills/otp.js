const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (phoneNumber, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log("OTP sent successfully");
  } catch (error) {
    console.log("Account SID:", process.env.TWILIO_ACCOUNT_SID);
    console.log("Auth Token:", process.env.TWILIO_AUTH_TOKEN);
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = { generateOTP, sendOTP };
