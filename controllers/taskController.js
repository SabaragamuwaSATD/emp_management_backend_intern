const express = require("express");
const Task = require("../models/Task");
const { cloudinary } = require("../configs/cloudinaryConfig");

// add task
exports.addTask = async (req, res, next) => {
  const { taskId, taskName, projectId, employeeId, assignDate, dueDate } =
    req.body;

  if (
    !taskId ||
    !taskName ||
    !projectId ||
    !employeeId ||
    !assignDate ||
    !dueDate
  ) {
    return res.status(400).json({
      message: "Required field/s missing",
    });
  }

  try {
    const newTask = new Task({
      taskId,
      taskName,
      projectId,
      employeeId,
      assignDate: new Date(assignDate),
      dueDate: new Date(dueDate),
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Your Task added successfully",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

//get all task
exports.allTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Task found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All Tasks",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

//get task by id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task found",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

//update task
exports.updateTask = async (req, res, next) => {
  const { taskName, projectId, employeeId, assignDate, dueDate } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.taskName = taskName || task.taskName;
    task.projectId = projectId || task.projectId;
    task.employeeId = employeeId || task.employeeId;
    task.assignDate = assignDate || task.assignDate;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

//delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
