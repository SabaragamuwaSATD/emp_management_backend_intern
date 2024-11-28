const express = require("express");
const Document = require("../models/Document");
const { cloudinary } = require("../configs/cloudinaryConfig");

//add document
exports.addDocument = async (req, res, next) => {
  const { documentId, documentName, documentType, noOfPage } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Document file is required.",
    });
  }

  if (!documentId || !documentName || !documentType || !noOfPage) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  console.log(req.body);
  console.log(req.files);

  try {
    const newDocument = new Document({
      documentId,
      document: {
        url: req.file.path,
        public_id: req.file.filename,
      },
      documentName,
      documentType,
      noOfPage,
    });

    await newDocument.save();

    res.status(201).json({
      success: true,
      data: newDocument,
    });
  } catch (error) {
    next(error);
  }
};

//get all document
exports.allDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find();
    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

//get single document
exports.getDocumentById = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }
    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

//update document
exports.updateDocument = async (req, res, next) => {
  const { documentId, documentName, documentType, noOfPage } = req.body;

  try {
    let document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(document.document.public_id);
      document.document = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    document.documentId = documentId || document.documentId;
    document.documentName = documentName || document.documentName;
    document.documentType = documentType || document.documentType;
    document.noOfPage = noOfPage || document.noOfPage;

    await document.save();

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

//delete document
exports.deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    await cloudinary.uploader.destroy(document.document.public_id);

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
