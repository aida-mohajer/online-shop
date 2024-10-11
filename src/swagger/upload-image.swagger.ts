// src/swagger/image.swagger.ts

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image management operations
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
 * /api/images/upload:
 *   post:
 *     summary: Upload multiple images
 *     description: This endpoint allows users to upload multiple new images.
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The image files to upload
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Retrieve all uploaded images
 *     description: This endpoint retrieves a list of all uploaded images.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: A list of uploaded images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: http://localhost:3000/originals/example.jpg
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/images/remove/{fileName}:
 *   delete:
 *     summary: Remove an image from directory
 *     description: This endpoint deletes a specific image by filename.
 *     tags: [Images]
 *     parameters:
 *       - name: fileName
 *         in: path
 *         required: true
 *         description: The name of the image file to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: Image removed successfully
 *       404:
 *         description: Image not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
