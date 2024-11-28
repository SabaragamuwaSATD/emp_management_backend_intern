const express = require("express");
const Cost = require("../models/Cost");
const { cloudinary } = require("../configs/cloudinaryConfig");

//add cost report
exports.addCostReport = async (req, res, next) => {
  const { costId, date, title, reason, cost } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Report file is required.",
    });
  }

  if (!costId || !date || !title || !reason || !cost) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  console.log(req.body);
  console.log(req.files);

  try {
    const newCostReport = new Cost({
      costId,
      report: {
        url: req.file.path,
        public_id: req.file.filename,
      },
      date: new Date(date),
      title,
      reason,
      cost,
    });

    await newCostReport.save();

    res.status(201).json({
      success: true,
      data: newCostReport,
    });
  } catch (error) {
    next(error);
  }
};

//get all cost
exports.allCosts = async (req, res, next) => {
  try {
    const costs = await Cost.find();
    res.status(200).json({
      success: true,
      data: costs,
    });
  } catch (error) {
    next(error);
  }
};

//get cost by id
exports.getCostById = async (req, res, next) => {
  try {
    const cost = await Cost.findById(req.params.id);
    if (!cost) {
      return res.status(404).json({
        success: false,
        message: "Cost not found",
      });
    }
    res.status(200).json({
      success: true,
      data: cost,
    });
  } catch (error) {
    next(error);
  }
};

//update cost
exports.updateCostReport = async (req, res, next) => {
  const { costId, date, title, reason, cost } = req.body;

  try {
    let costReport = await Cost.findById(req.params.id);

    if (!costReport) {
      return res.status(404).json({ message: "Cost report not found" });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(costReport.report.public_id);
      costReport.report = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    costReport.costId = costId || costReport.costId;
    costReport.date = date || costReport.date;
    costReport.title = title || costReport.title;
    costReport.reason = reason || costReport.reason;
    costReport.cost = cost || costReport.cost;

    await costReport.save();

    res.status(200).json({
      success: true,
      data: costReport,
    });
  } catch (error) {
    next(error);
  }
};

//delete cost
exports.deleteCostReport = async (req, res, next) => {
  try {
    const costReport = await Cost.findByIdAndDelete(req.params.id);

    if (!costReport) {
      return res.status(404).json({ message: "Cost report not found" });
    }

    await cloudinary.uploader.destroy(costReport.report.public_id);

    res.status(200).json({
      success: true,
      message: "Cost report deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
