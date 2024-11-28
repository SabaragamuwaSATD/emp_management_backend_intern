const express = require("express");
const router = express.Router();
const {
  addDocument,
  allDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");
const { upload } = require("../configs/cloudinaryConfig");

/**
 * @swagger
 * /api/v1/documents/add:
 *   post:
 *     summary: Add a new document
 *     tags: [Document]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: string
 *               document:
 *                 type: string
 *                 format: binary
 *               documentName:
 *                 type: string
 *               documentType:
 *                 type: string
 *                 enum: [
 *                   'Income',
 *                   'Cost',
 *                   'Agreement With Client',
 *                   'Agreement With Employee',
 *                   'Company'
 *                 ]
 *               noOfPage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Document created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/add", upload.single("document"), addDocument);
router.get("/", allDocuments);
router.get("/:id", getDocumentById);

/**
 * @swagger
 * /api/v1/documents/{id}:
 *   put:
 *     summary: Update an existing document
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: string
 *               document:
 *                 type: string
 *                 format: binary
 *               documentName:
 *                 type: string
 *               documentType:
 *                 type: string
 *                 enum: [
 *                   'Income',
 *                   'Cost',
 *                   'Agreement With Client',
 *                   'Agreement With Employee',
 *                   'Company'
 *                 ]
 *               noOfPage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Document updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", upload.single("document"), updateDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
