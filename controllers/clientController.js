const express = require("express");
const Client = require("../models/Client");
const { upload, cloudinary } = require("../configs/cloudinaryConfig");
const { get } = require("mongoose");

//add client
exports.addClient = async (req, res, next) => {
  const {
    clientID,
    clientName,
    clientAddress,
    clientContactNumber,
    bankNumber,
    bankName,
    idNumber,
    companyName,
    projectName,
    startProjectDate,
    endProjectDate,
  } = req.body;

  if (
    !req.files ||
    !req.files.clientPhoto ||
    !req.files.projectLogo ||
    !req.files.agreement
  ) {
    return res.status(400).json({
      message:
        "Required files are missing (clientPhoto, projectLogo, agreement).",
    });
  }

  console.log(req.body);
  console.log(req.files);

  try {
    const newClient = new Client({
      clientID,
      clientPhoto: {
        url: req.files.clientPhoto[0].path,
        public_id: req.files.clientPhoto[0].filename,
      },
      clientName,
      clientAddress,
      clientContactNumber,
      bankNumber,
      bankName,
      idNumber,
      companyName,
      projectName,
      projectLogo: {
        url: req.files.projectLogo[0].path,
        public_id: req.files.projectLogo[0].filename,
      },
      startProjectDate: new Date(startProjectDate),
      endProjectDate: new Date(endProjectDate),
      agreement: {
        url: req.files.agreement[0].path,
        public_id: req.files.agreement[0].filename,
      },
    });

    await newClient.save();

    res.status(201).json({
      success: true,
      data: newClient,
    });
  } catch (error) {
    next(error);
  }
};

//get all clients
exports.getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

//get single client
exports.getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

//update client
exports.updateClient = async (req, res, next) => {
  try {
    const clientId = req.params.id;
    const existingData = await Client.findById(clientId);

    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    let newClientPhoto = existingData.clientPhoto;
    let newProjectLogo = existingData.projectLogo;
    let newAgreement = existingData.agreement;

    if (req.files.clientPhoto) {
      await cloudinary.uploader.destroy(existingData.clientPhoto.public_id);
      newClientPhoto = {
        url: req.files.clientPhoto[0].path,
        public_id: req.files.clientPhoto[0].filename,
      };
    }

    if (req.files.projectLogo) {
      await cloudinary.uploader.destroy(existingData.projectLogo.public_id);
      newProjectLogo = {
        url: req.files.projectLogo[0].path,
        public_id: req.files.projectLogo[0].filename,
      };
    }

    if (req.files.agreement) {
      await cloudinary.uploader.destroy(existingData.agreement.public_id);
      newAgreement = {
        url: req.files.agreement[0].path,
        public_id: req.files.agreement[0].filename,
      };
    }

    const updatedClient = {
      ...req.body,
      clientPhoto: newClientPhoto,
      projectLogo: newProjectLogo,
      agreement: newAgreement,
    };

    const client = await Client.findByIdAndUpdate(clientId, updatedClient, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

//delete client
exports.deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await cloudinary.uploader.destroy(client.clientPhoto.public_id);
    await cloudinary.uploader.destroy(client.projectLogo.public_id);
    await cloudinary.uploader.destroy(client.agreement.public_id);

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
