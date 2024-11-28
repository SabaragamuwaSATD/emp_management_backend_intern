const express = require("express");
const Project = require("../models/Project");

// add project
exports.addProject = async (req, res, next) => {
  const {
    projectId,
    projectName,
    projectType,
    clientName,
    clientTelNo,
    assignDate,
    dueDate,
    handedDate,
  } = req.body;

  console.log(req.body);

  if (
    !projectId ||
    !projectName ||
    !projectType ||
    !clientName ||
    !clientTelNo ||
    !assignDate ||
    !dueDate ||
    !handedDate
  ) {
    return res.status(400).json({
      message: "Required field/s missing",
    });
  }

  try {
    const newProject = new Project({
      projectId,
      projectName,
      projectType,
      clientName,
      clientTelNo,
      assignDate: new Date(assignDate),
      dueDate: new Date(dueDate),
      handedDate: new Date(handedDate),
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

//get all project
exports.allProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();

    if (!projects) {
      return res.status(404).json({
        message: "Not Found Any Project/s",
      });
    }

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

//get project by id
exports.projectById = async (req, res, next) => {
  try {
    const projId = req.params.id;
    const project = await Project.findById(projId);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

//update project
exports.updatedProject = async (req, res, next) => {
  try {
    const projId = req.params.id;
    const existingData = await Project.findById(projId);

    if (!existingData) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    const updatedPrject = {
      ...req.body,
    };

    const project = await Project.findByIdAndUpdate(projId, updatedPrject, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Project Successfully Updated",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// delete specific project
exports.deleteProject = async (req, res, next) => {
  try {
    const projId = req.params.id;
    const project = await Project.findByIdAndDelete(projId);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// search by project name

exports.searchProject = async (req, res, next) => {
  try {
    const search = req.query.search;
    const projects = await Project.find({
      projectName: { $regex: search, $options: "i" },
    });

    if (projects.length === 0) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};
