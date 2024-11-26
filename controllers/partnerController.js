const express = require("express");
const Partner = require("../models/Partner");
const { upload, cloudinary } = require("../configs/cloudinaryConfig");

//add a partner
exports.addPartner = async (req, res, next) => {
  const {
    partnerId,
    partnerName,
    partnerOfficeAddress,
    partnerContactNumber,
    bankNumber,
    bankName,
    nicNumber,
    companyName,
    reason,
  } = req.body;

  if (
    !req.files ||
    !req.files.partnerPhoto ||
    !req.files.agreement ||
    !req.files.companyLogo
  ) {
    return res.status(400).json({
      message:
        "Required Files are missing, partnerPhoto or agreement or companyLogo",
    });
  }

  console.log(req.body);
  console.log(req.files);

  try {
    const newPartner = new Partner({
      partnerId,
      partnerName,
      partnerOfficeAddress,
      partnerContactNumber,
      bankNumber,
      bankName,
      nicNumber,
      partnerPhoto: {
        url: req.files.partnerPhoto[0].path,
        public_id: req.files.partnerPhoto[0].filename,
      },
      companyName,
      agreement: {
        url: req.files.agreement[0].path,
        public_id: req.files.agreement[0].filename,
      },
      companyLogo: {
        url: req.files.companyLogo[0].path,
        public_id: req.files.companyLogo[0].filename,
      },
      reason,
    });

    await newPartner.save();

    res.status(201).json({
      success: true,
      data: newPartner,
    });
  } catch (error) {
    next(error);
  }
};

// get all partner
exports.getPartners = async (req, res, next) => {
  try {
    const partners = await Partner.find();

    res.status(200).json({
      success: true,
      data: partners,
    });
  } catch (error) {
    next(error);
  }
};

// get partner by the id
exports.getPartnerById = async (req, res, next) => {
  try {
    const partnerId = req.params.id;
    const partner = await Partner.findById(partnerId);

    if (!partner) {
      return res.status(404).json({
        message: "Partner Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: partner,
    });
  } catch (error) {
    next(error);
  }
};

// update client
exports.updatePartner = async (req, res, next) => {
  try {
    const partnerId = req.params.id;
    const existingData = await Partner.findById(partnerId);

    if (!existingData) {
      return res.status(400).json({
        success: false,
        message: "Partner Not Found",
      });
    }

    let newPartnerPhoto = existingData.partnerPhoto;
    let newAgreement = existingData.agreement;
    let newCompanyLogo = existingData.companyLogo;

    if (req.files.partnerPhoto) {
      cloudinary.uploader.destroy(existingData.partnerPhoto.public_id);
      newPartnerPhoto = {
        url: req.files.partnerPhoto[0].path,
        public_id: req.files.partnerPhoto[0].filename,
      };
    }

    if (req.files.agreement) {
      cloudinary.uploader.destroy(existingData.agreement.public_id);
      newAgreement = {
        url: req.files.agreement[0].path,
        public_id: req.files.agreement[0].filename,
      };
    }

    if (req.files.companyLogo) {
      cloudinary.uploader.destroy(existingData.companyLogo.public_id);
      newCompanyLogo = {
        url: req.files.companyLogo[0].path,
        public_id: req.files.companyLogo[0].filename,
      };
    }

    const updatedPartner = {
      ...req.body,
      partnerPhoto: newPartnerPhoto,
      agreement: newAgreement,
      companyLogo: newCompanyLogo,
    };

    const partner = await Partner.findByIdAndUpdate(partnerId, updatedPartner, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Partner Updated Successfully",
      data: partner,
    });
  } catch (error) {
    next(error);
  }
};

//delete Partner
exports.deletePartner = async (req, res, next) => {
  try {
    const partnerId = req.params.id;
    const partner = await Partner.findByIdAndDelete(partnerId);

    if (!partner) {
      return res.status(404).json({
        message: "Partner Not Found",
      });
    }

    await cloudinary.uploader.destroy(partner.partnerPhoto.public_id);
    await cloudinary.uploader.destroy(partner.agreement.public_id);
    await cloudinary.uploader.destroy(partner.companyLogo.public_id);

    res.status(200).json({
      success: true,
      message: "Client delete successfully",
    });
  } catch (error) {
    next(error);
  }
};
