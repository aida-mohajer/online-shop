/**
 * @swagger
 * tags:
 *   - name: SubAttributes
 *     description: Sub-attribute management operations
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
 * /api/sub-attr/{attrId}:
 *   post:
 *     summary: Create a new sub-attribute
 *     description: This endpoint allows authenticated users to create a new sub-attribute under a specific attribute.
 *     tags: [SubAttributes]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: ID of the attribute to which the sub-attribute belongs
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 description: Value of the sub-attribute
 *             required:
 *               - value
 *     responses:
 *       201:
 *         description: Sub-attribute created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/sub-attr/{attrId}:
 *   get:
 *     summary: Get sub-attributes of an attribute
 *     description: This endpoint retrieves all sub-attributes associated with a specific attribute.
 *     tags: [SubAttributes]
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: ID of the attribute to retrieve sub-attributes for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sub-attributes retrieved successfully
 *       404:
 *         description: Attribute not found
 */

/**
 * @swagger
 * /api/sub-attr/{subAttrId}:
 *   delete:
 *     summary: Delete a specific sub-attribute
 *     description: This endpoint allows authenticated users to delete a sub-attribute by its ID.
 *     tags: [SubAttributes]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: subAttrId
 *         in: path
 *         required: true
 *         description: ID of the sub-attribute to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sub-attribute deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Sub-attribute not found
 */

/**
 * @swagger
 * /api/sub-attr/product/{productId}:
 *   get:
 *     summary: Get sub-attributes for a specific product
 *     description: This endpoint retrieves all sub-attributes associated with a specific product.
 *     tags: [SubAttributes]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve sub-attributes for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sub-attributes retrieved successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/sub-attr/product/{productId}:
 *   post:
 *     summary: Assign sub attributes to a specific product
 *     description: Allows authenticated users to assign sub attributes to a specific product.
 *     tags: [SubAttributes]
 *     security:
 *       - bearerAuth: []  # Uses Bearer token for authentication
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Unique identifier of the product to assign sub attributes to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subAttributeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of sub attribute IDs to assign to the product.
 *     responses:
 *       200:
 *         description: Sub attributes assigned to product successfully.
 *       400:
 *         description: Validation error, including invalid input data.
 *       401:
 *         description: Unauthorized access, user not authenticated.
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * /api/sub-attr/product/{productId}/attr/{subAttrId}:
 *   delete:
 *     summary: Delete a specific product sub-attribute
 *     description: This endpoint allows authenticated users to delete a product's sub-attribute by its ID.
 *     tags: [SubAttributes]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product that has the sub-attribute
 *         schema:
 *           type : string
 *
 *       - name : subAttrId
 *         in : path
 *         required : true
 *         description : ID of the sub-attribute to delete
 *
 */
