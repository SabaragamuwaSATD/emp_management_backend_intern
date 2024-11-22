const express = require("express");
const {
  addClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientController");
const { upload } = require("../configs/cloudinaryConfig");
const { get } = require("mongoose");
const router = express.Router();

/**
 * @swagger
 * /api/v1/clients/add:
 *   post:
 *     summary: Add a new client
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               clientID:
 *                 type: string
 *               clientPhoto:
 *                 type: string
 *                 format: binary
 *               clientName:
 *                 type: string
 *               clientAddress:
 *                 type: string
 *               clientContactNumber:
 *                 type: string
 *               idNumber:
 *                 type: string
 *               bankNumber:
 *                 type: string
 *               bankName:
 *                 type: string
 *               companyName:
 *                 type: string
 *               projectName:
 *                 type: string
 *               projectLogo:
 *                 type: string
 *                 format: binary
 *               startProjectDate:
 *                 type: string
 *                 format: date
 *               endProjectDate:
 *                 type: string
 *                 format: date
 *               agreement:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/add",
  upload.fields([
    { name: "clientPhoto", maxCount: 1 },
    { name: "projectLogo", maxCount: 1 },
    { name: "agreement", maxCount: 1 },
  ]),
  addClient
);

router.get("/", getClients);
router.get("/:id", getClient);
router.delete("/delete/:id", deleteClient);
router.put(
  "/update/:id",
  upload.fields([
    { name: "clientPhoto", maxCount: 1 },
    { name: "projectLogo", maxCount: 1 },
    { name: "agreement", maxCount: 1 },
  ]),
  updateClient
);

module.exports = router;
