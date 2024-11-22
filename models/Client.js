const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientID: {
    type: String,
    required: true,
  },
  clientPhoto: {
    public_id: { type: String },
    url: { type: String },
  },
  clientName: {
    type: String,
    required: true,
  },
  clientAddress: {
    type: String,
    required: true,
  },
  clientContactNumber: {
    type: String,
    required: true,
  },
  // dob: {
  //   type: Date,
  //   required: true,
  // },
  idNumber: {
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
  companyName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectLogo: {
    public_id: { type: String },
    url: { type: String },
  },
  startProjectDate: {
    type: String,
    required: true,
  },
  endProjectDate: {
    type: Date,
    required: true,
  },
  agreement: {
    public_id: { type: String },
    url: { type: String },
  },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
