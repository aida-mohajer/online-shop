/**
 * @swagger
 * tags:
 *   name: Attributes
 *   description: Operations for managing attributes.
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
 * /api/attributes:
 *   post:
 *     summary: Create a new attribute
 *     description: Allows authenticated users to create a new attribute.
 *     tags: [Attributes]
 *     security:
 *       - bearerAuth: []  # Uses Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the attribute.
 *     responses:
 *       201:
 *         description: Attribute successfully created.
 *       400:
 *         description: Validation error, including invalid input data.
 *       401:
 *         description: Unauthorized access, user not authenticated.
 */

/**
 * @swagger
 * /api/attributes:
 *   get:
 *     summary: Retrieve a list of attributes
 *     description: Get all attributes for the authenticated user with optional search functionality.
 *     tags: [Attributes]
 *     parameters:
 *       - name: attributeName
 *         in: query
 *         description: Filter attributes by name
 *         required: false
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Uses Bearer token for authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved list of attributes.
 *       401:
 *         description: Unauthorized access, user not authenticated.
 */

/**
 * @swagger
 * /api/attributes/{attrId}:
 *   put:
 *     summary: Update an existing attribute by ID
 *     description: Allows authenticated users to update an existing attribute.
 *     tags: [Attributes]
 *     security:
 *       - bearerAuth: []  # Uses Bearer token for authentication
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: Unique identifier of the attribute to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the attribute.
 *     responses:
 *       200:
 *         description: Attribute successfully updated.
 *       400:
 *         description: Validation error, including invalid input data.
 *       401:
 *         description: Unauthorized access, user not authenticated.
 *       404:
 *         description: Attribute not found, invalid ID provided.
 */

/**
 * @swagger
 * /api/attributes/{attrId}:
 *   delete:
 *     summary: Delete an attribute by ID
 *     description: Allows authenticated users to delete an existing attribute by its ID.
 *     tags: [Attributes]
 *     security:
 *       - bearerAuth: []  # Uses Bearer token for authentication
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: Unique identifier of the attribute to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Attribute deleted successfully, no content returned.
 *       401:
 *         description: Unauthorized access; user not authenticated.
 *       404:
 *         description: Attribute not found; invalid ID provided.
 */

/**
 * @swagger
 * /api/attributes/category/{categoryId}:
 *   post:
 *     summary: Assign attributes to a specific category
 *     description: Allows authenticated users to assign attributes to a specific category.
 *     tags: [Attributes]
 *     security:
 *       - bearerAuth: []  # Uses Bearer token for authentication
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the category to assign attributes to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attributeIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of attribute IDs to assign to the category.
 *     responses:
 *       200:
 *         description: Attributes assigned to category successfully.
 *       400:
 *         description: Validation error, including invalid input data.
 *       401:
 *         description: Unauthorized access, user not authenticated.
 *       404:
 *         description: Category not found.
 */

/**
 * @swagger
 * /api/attributes/category/{categoryId}:
 *   get:
 *     summary: Retrieve attributes for a specific category
 *     description: Fetches all attributes associated with the given category ID.
 *     tags: [Attributes]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the category to fetch attributes for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved attributes for the specified category.
 *       404:
 *         description: Category not found; no attributes associated with the given ID.
 */

/**
 * @swagger
 * /api/attributes/category/{categoryId}/attr/{attrId}:
 *   delete:
 *     summary: Remove an attribute from a category
 *     description: Allows authenticated users to remove an attribute from a specific category by attribute ID.
 *     tags: [Attributes]
 *     security:
 *       - bearerAuth: []  # Uses Bearer token for authentication
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: Unique identifier of the category.
 *         schema:
 *           type: string
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: Unique identifier of the attribute to be removed.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Attribute removed from category successfully, no content returned.
 *       401:
 *         description: Unauthorized access, user not authenticated.
 *       404:
 *         description: Category or attribute not found; invalid ID(s) provided.
 */
