/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback management operations
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
 * /api/feedbacks/{productId}:
 *   post:
 *     summary: Create feedback for a product
 *     description: This endpoint allows authenticated users to create feedback for a specific product.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to provide feedback for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating for the product (e.g., 1 to 5)
 *               comment:
 *                 type: string
 *                 description: Feedback comment
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/feedbacks/{productId}:
 *   get:
 *     summary: Get feedbacks for a product
 *     description: This endpoint retrieves all feedbacks for a specific product with pagination.
 *     tags: [Feedback]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve feedback for
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of feedbacks per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of feedbacks retrieved successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/feedbacks/{feedbackId}:
 *   put:
 *     summary: Update feedback
 *     description: This endpoint allows authenticated users to update their feedback by feedback ID.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: feedbackId
 *         in: path
 *         required: true
 *         description: ID of the feedback to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Updated rating for the product (e.g., 1 to 5)
 *               comment:
 *                 type: string
 *                 description: Updated feedback comment
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Feedback not found
 */

/**
 * @swagger
 * /api/feedbacks/{feedbackId}:
 *   delete:
 *     summary: Delete feedback
 *     description: This endpoint allows authenticated users to delete their feedback by feedback ID.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: feedbackId
 *         in: path
 *         required: true
 *         description: ID of the feedback to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Feedback deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Feedback not found
 */
