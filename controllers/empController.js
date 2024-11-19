const express = require("express");
const Employee = require("../models/Employee");
const { upload } = require("../configs/cloudinaryConfig");

// add Employee
exports.addEmployee = async (req, res, next) => {
  try {
    const newEmployee = new Employee({
      ...req.body,
      photo: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });
    await newEmployee.save();
    res.status(201).json({
      success: true,
      data: newEmployee,
    });
  } catch (error) {
    next(error);
  }
};
