const mongoose = require("mongoose");

const costSchema = new mongoose.Schema({
  costId: {
    type: String,
    required: true,
  },
  report: {
    url: { type: String },
    public_id: { type: String },
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
});

const Cost = new mongoose.model("Cost", costSchema);
module.exports = Cost;
