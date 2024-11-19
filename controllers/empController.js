const express = require("express");
const Employee = require("../models/Employee");
const { upload, cloudinary } = require("../configs/cloudinaryConfig");

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

//Get All Employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      data: employees,
    });

    if (employees.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No employees found",
      });
    }
  } catch (error) {
    next(error);
  }
};

//Delete Employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const empId = req.params.id;
    const employee = await Employee.findByIdAndDelete(empId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await cloudinary.uploader.destroy(employee.photo.public_id);
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
