const {
  addCostReport,
  allCosts,
  getCostById,
  updateCostReport,
  deleteCostReport,
} = require("../controllers/costController");
const { upload } = require("../configs/cloudinaryConfig");
const router = require("express").Router();

/**
 * @swagger
 * /api/v1/costs/add:
 *   post:
 *     summary: Add a new cost
 *     tags: [Cost]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               costId:
 *                 type: string
 *               report:
 *                 type: string
 *                 format: binary
 *               date:
 *                 type: string
 *                 format: date
 *               title:
 *                 type: string
 *               reason:
 *                 type: string
 *               cost:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cost created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cost'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/add", upload.single("report"), addCostReport);
router.get("/", allCosts);
router.get("/:id", getCostById);
/**
 * @swagger
 * /api/v1/costs/{id}:
 *   put:
 *     summary: Update an existing cost report
 *     tags: [Cost]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the cost report to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               costId:
 *                 type: string
 *               report:
 *                 type: string
 *                 format: binary
 *               date:
 *                 type: string
 *                 format: date
 *               title:
 *                 type: string
 *               reason:
 *                 type: string
 *               cost:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cost report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cost'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Cost report not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", upload.single("report"), updateCostReport);
router.delete("/:id", deleteCostReport);

module.exports = router;
