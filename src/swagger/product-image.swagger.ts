// src/swagger/product-image.swagger.ts

/**
 * @swagger
 * tags:
 *   name: Product Images
 *   description: Product image management operations
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
 * /api/product/images/{productId}:
 *   post:
 *     summary: add a new image for a product
 *     description: This endpoint allows users to add a new image associated with a specific product.
 *     tags: [Product Images]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to which the image will be associated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageName:
 *                 type: string
 *               imageType:
 *                 type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       201:
 *         description: Image added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/product/images/{productId}:
 *   get:
 *     summary: Retrieve images for a product
 *     description: This endpoint retrieves a list of images associated with a specific product.
 *     tags: [Product Images]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product for which to retrieve images
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of images for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       imageName:
 *                         type: string
 *                       imageType:
 *                         type: string
 *       404:
 *         description: Product not found
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/product/images/{imageId}:
 *   put:
 *     summary: Update an existing image
 *     description: This endpoint allows users to update the details of an existing product image.
 *     tags: [Product Images]
 *     parameters:
 *       - name: imageId
 *         in: path
 *         required: true
 *         description: The ID of the image to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageName:
 *                 type: string
 *               imageType:
 *                 type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: Image updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Image not found
 */

/**
 * @swagger
 * /api/product/images/{imageId}:
 *   delete:
 *     summary: Delete an image
 *     description: This endpoint allows users to delete a specific image by its ID.
 *     tags: [Product Images]
 *     parameters:
 *       - name: imageId
 *         in: path
 *         required: true
 *         description: The ID of the image to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       204:
 *         description: Image deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Image not found
 */
