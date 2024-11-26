const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  partnerId: {
    type: String,
    required: true,
  },
  partnerName: {
    type: String,
    required: true,
  },
  partnerOfficeAddress: {
    type: String,
    required: true,
  },
  partnerContactNumber: {
    type: String,
    required: true,
  },
  bankNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  nicNumber: {
    type: String,
    required: true,
  },
  partnerPhoto: {
    public_id: { type: String },
    url: { type: String },
  },
  companyName: {
    type: String,
    required: true,
  },
  agreement: {
    public_id: { type: String },
    url: { type: String },
  },
  companyLogo: {
    public_id: { type: String },
    url: { type: String },
  },
  reason: {
    type: String,
    required: true,
  },
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
