/**
 * @swagger
 * tags:
 *   name: ETL
 *   description: ETL management operations
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/webpage/etl:
 *   get:
 *     summary: Extract data from a webpage
 *     description: This endpoint triggers the ETL (Extract, Transform, Load) process to extract data from a specified webpage.
 *     tags: [ETL]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: url
 *         in: query
 *         required: true
 *         description: The URL of the webpage to extract data from.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data extracted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Data extracted successfully"
 *       400:
 *         description: Bad request, invalid URL or parameters
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Webpage not found or unable to extract data from the given URL
 */
