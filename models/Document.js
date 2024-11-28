const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true,
  },
  document: {
    url: { type: String },
    public_id: { type: String },
  },
  documentName: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    enum: [
      "Income",
      "Cost",
      "Agreement With Client",
      "Agreement With Employee",
      "Company",
    ],
    required: true,
  },
  noOfPage: {
    type: String,
    required: true,
  },
});

const Document = new mongoose.model("Document", documentSchema);
module.exports = Document;
