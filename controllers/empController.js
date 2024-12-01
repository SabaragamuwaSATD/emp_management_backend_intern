const express = require("express");
const Employee = require("../models/Employee");
const { upload, cloudinary } = require("../configs/cloudinaryConfig");

// add Employee
exports.addEmployee = async (req, res, next) => {
  try {
    const {
      employeeId,
      name,
      address,
      telNo,
      dob,
      nic,
      bankNo,
      bankName,
      jobRole,
      startWorkDate,
      endWorkDate,
    } = req.body;

    // Check if the photo is provided
    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const newEmployee = new Employee({
      employeeId,
      photo: {
        url: req.file.path,
        public_id: req.file.filename,
      },
      name,
      address,
      telNo,
      dob: new Date(dob),
      nic,
      bankNo,
      bankName,
      jobRole,
      startWorkDate: new Date(startWorkDate),
      endWorkDate: new Date(endWorkDate),
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

//Get Employee by ID
exports.getEmployeeById = async (req, res, next) => {
  try {
    const empId = req.params.id;
    const employee = await Employee.findById(empId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// update Employee
exports.updateEmployee = async (req, res, next) => {
  try {
    const empId = req.params.id;
    const existingData = await Employee.findById(empId);

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    let newPhoto = existingData.photo;

    if (req.file) {
      if (existingData.photo && existingData.photo.public_id) {
        await cloudinary.uploader.destroy(existingData.photo.public_id);
      }
      newPhoto = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    const updatedData = {
      ...req.body,
      photo: newPhoto,
    };

    const updatedEmployee = await Employee.findByIdAndUpdate(
      empId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Employee
// exports.deleteEmployee = async (req, res, next) => {
//   try {
//     const empId = req.params.id;
//     const employee = await Employee.findByIdAndDelete(empId);

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//       });
//     }

//     await cloudinary.uploader.destroy(employee.photo.public_id);
//     res.status(200).json({
//       success: true,
//       message: "Employee deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// Frime's code
exports.deleteEmployee = async (req, res, next) => {
  try {
    const empId = req.params.id;

    // Match by custom employee ID field
    const employee = await Employee.findOneAndDelete({ employeeId: empId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check if photo exists before deleting from Cloudinary
    if (employee.photo && employee.photo.public_id) {
      await cloudinary.uploader.destroy(employee.photo.public_id);
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    next(error);
  }
};

//search by employee id

exports.searchEmployee = async (req, res, next) => {
  try {
    const search = req.query.search;
    const employee = await Employee.find({
      name: { $regex: search, $options: "i" }, //search by name
    });

    if (employee.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Employee found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee found",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};
