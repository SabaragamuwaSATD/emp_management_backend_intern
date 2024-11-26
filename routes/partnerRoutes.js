const express = require("express");
const {
  addPartner,
  getPartners,
  getPartnerById,
  deletePartner,
  updatePartner,
} = require("../controllers/partnerController");
const { upload } = require("../configs/cloudinaryConfig");
const router = express.Router();

/**
 * @swagger
 * /api/v1/partners/add:
 *   post:
 *     summary: Add a new partner
 *     tags: [Partner]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               partnerId: { type: string, description: "Unique identifier for the partner" }
 *               partnerName: { type: string, description: "Name of the partner" }
 *               partnerOfficeAddress: { type: string, description: "Office address" }
 *               partnerContactNumber: { type: string, description: "Contact number" }
 *               bankNumber: { type: string, description: "Bank account number" }
 *               bankName: { type: string, description: "Bank name" }
 *               nicNumber: { type: string, description: "NIC number" }
 *               companyName: { type: string, description: "Company name" }
 *               reason: { type: string, description: "Reason for registration" }
 *               partnerPhoto: { type: string, format: binary, description: "Partner photo" }
 *               agreement: { type: string, format: binary, description: "Agreement document" }
 *               companyLogo: { type: string, format: binary, description: "Company logo" }
 *     responses:
 *       201:
 *         description: Partner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partner'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post(
  "/add",
  upload.fields([
    { name: "partnerPhoto", maxCount: 1 },
    { name: "agreement", maxCount: 1 },
    { name: "companyLogo", maxCount: 1 },
  ]),
  addPartner
);
router.get("/", getPartners);
router.get("/:id", getPartnerById);
router.delete("/:id", deletePartner);

/**
 * @swagger
 * /api/v1/partners/{id}:
 *   put:
 *     summary: Update an existing partner
 *     tags:
 *       - Partner
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the partner to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               partnerName:
 *                 type: string
 *                 description: Updated name of the partner
 *               partnerOfficeAddress:
 *                 type: string
 *                 description: Updated office address of the partner
 *               partnerContactNumber:
 *                 type: string
 *                 description: Updated contact number of the partner
 *               bankNumber:
 *                 type: string
 *                 description: Updated bank account number of the partner
 *               bankName:
 *                 type: string
 *                 description: Updated bank name of the partner
 *               nicNumber:
 *                 type: string
 *                 description: Updated NIC number of the partner
 *               companyName:
 *                 type: string
 *                 description: Updated company name
 *               reason:
 *                 type: string
 *                 description: Updated reason for the changes
 *               partnerPhoto:
 *                 type: string
 *                 format: binary
 *                 description: Updated photo of the partner
 *               agreement:
 *                 type: string
 *                 format: binary
 *                 description: Updated agreement document
 *               companyLogo:
 *                 type: string
 *                 format: binary
 *                 description: Updated company logo
 *     responses:
 *       200:
 *         description: Partner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Partner updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Partner'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Partner not found
 *       500:
 *         description: Internal server error
 */

router.put(
  "/:id",
  upload.fields([
    { name: "partnerPhoto", maxCount: 1 },
    { name: "agreement", maxCount: 1 },
    { name: "companyLogo", maxCount: 1 },
  ]),
  updatePartner
);
module.exports = router;
