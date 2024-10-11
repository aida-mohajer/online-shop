/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management operations
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
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     description: This endpoint allows authenticated users to create a new category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *               parentCategoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *     summary: Get a specific category
 *     description: This endpoint retrieves a specific category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: This endpoint retrieves all categories with pagination.
 *     tags: [Categories]
 *     parameters:
 *       - name: categoryName
 *         in: query
 *         description: Filter categories by name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *     summary: Update a specific category
 *     description: This endpoint allows authenticated users to update a category by its ID.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: Delete a specific category
 *     description: This endpoint allows authenticated users to delete a category by its ID.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Category not found
 */
/**
 * @swagger
 * /api/categories/{categoryId}/attr/{attrId}:
 *   delete:
 *     summary: Delete an attribute from a category
 *     description: This endpoint allows authenticated users to delete an attribute from a specific category.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category from which to delete the attribute
 *         schema:
 *           type: string
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: ID of the attribute to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Attribute deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Category or attribute not found
 */
