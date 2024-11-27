const express = require("express");
const {
  addIncomeReport,
  getIncomeReports,
  getIncomeReportById,
  deleteIncomeReport,
  updateIncomeReport,
} = require("../controllers/incomeController");
const { upload } = require("../configs/cloudinaryConfig");
const router = express.Router();

/**
 * @swagger
 * /api/v1/incomes/add:
 *   post:
 *     summary: Add a new income report with a PDF document
 *     tags: [Income]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               incomeReportID:
 *                 type: string
 *                 description: "Unique identifier for the income report"
 *               date:
 *                 type: string
 *                 format: date
 *                 description: "Date of the income report"
 *               title:
 *                 type: string
 *                 description: "Title of the income report"
 *               description:
 *                 type: string
 *                 description: "Description of the income report"
 *               income:
 *                 type: string
 *                 description: "Income amount"
 *               projectName:
 *                 type: string
 *                 description: "Associated project ID"
 *               report:
 *                 type: string
 *                 format: binary
 *                 description: "PDF document of the income report"
 *     responses:
 *       201:
 *         description: Income report created successfully
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
 *                   example: "Income report added successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Income'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Report file is required."
 *       500:
 *         description: Internal server error
 */

router.post("/add", upload.single("report"), addIncomeReport);
router.get("/", getIncomeReports);
router.get("/:id", getIncomeReportById);
router.put("/:id", upload.single("report"), updateIncomeReport);
router.delete("/:id", deleteIncomeReport);

module.exports = router;
