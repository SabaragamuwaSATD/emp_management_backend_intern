const express = require("express");
const Income = require("../models/Income");
const { cloudinary } = require("../configs/cloudinaryConfig");

//add income report
exports.addIncomeReport = async (req, res, next) => {
  const {
    incomeReportID,
    date,
    title,
    description,
    income,
    projectName,
    clientName,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Report file is required.",
    });
  }

  if (
    !incomeReportID ||
    !date ||
    !title ||
    !description ||
    !income ||
    !projectName
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  console.log(req.body);
  console.log(req.files);

  try {
    const newIncomeReport = new Income({
      incomeReportID,
      report: {
        url: req.file.path,
        public_id: req.file.filename,
      },
      date: new Date(date),
      title,
      description,
      income,
      projectName,
      clientName,
    });

    await newIncomeReport.save();

    res.status(200).json({
      success: true,
      message: "Income report saved successfully",
      data: newIncomeReport,
    });
  } catch (error) {
    next(error);
  }
};

//get all income reports
exports.getIncomeReports = async (req, res, next) => {
  try {
    const incomeReports = await Income.find();

    if (!incomeReports) {
      return res.status(404).json({
        message: "Report Not Found",
      });
    }

    res.status(200).json({
      success: true,
      messages: "All the income reports are there",
      data: incomeReports,
    });
  } catch (error) {
    next(error);
  }
};

// get income report by id

exports.getIncomeReportById = async (req, res, next) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Your report is there",
      data: income,
    });
  } catch (error) {
    next(error);
  }
};

// update income report
exports.updateIncomeReport = async (req, res, next) => {
  try {
    const incomeId = req.params.id;
    const existingData = await Income.findById(incomeId);

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "Income report not found",
      });
    }

    let newReport = existingData.report;

    if (req.file) {
      if (existingData.report && existingData.report.public_id) {
        await cloudinary.uploader.destroy(existingData.report.public_id);
      }
      newReport = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedData = {
      ...req.body,
      report: newReport,
    };

    const updatedIncomeReport = await Income.findByIdAndUpdate(
      incomeId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Income report updated succesfully",
      data: updatedIncomeReport,
    });
  } catch (error) {
    next(error);
  }
};

// delete income report by id
exports.deleteIncomeReport = async (req, res, next) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income report not found",
      });
    }

    if (income.report && income.report.public_id) {
      await cloudinary.uploader.destroy(income.report.public_id);
    }

    res.status(200).json({
      success: true,
      message: "Report deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
