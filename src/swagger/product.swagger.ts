// src/swagger/product.swagger.ts

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management operations
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
 * /api/products/{categoryId}:
 *   post:
 *     summary: Create a new product
 *     description: This endpoint allows authenticated users to create a new product under a specific category.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to add the product to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               attributes:
 *                 type: array
 *                 description: List of attributes associated with the product.
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier for the attribute (UUID format)
 *                       example: "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e"  # Example UUID for attribute ID
 *                     value:
 *                       type: string
 *                       description: The value of the attribute
 *                 example:
 *                   - id: "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e"
 *                     value: "Sample Attribute Value"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get a specific product
 *     description: This endpoint retrieves a specific product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{categoryId}/category:
 *   get:
 *     summary: Get products of a category
 *     description: This endpoint retrieves products of a category by its ID.
 *     tags: [Products]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *       - name: x-forwarded-for
 *         in: header
 *         required: false
 *         description: The IP address of the client. Useful for identifying the original client IP when behind proxies.
 *         schema:
 *           type: string
 *           example: "192.168.1.100"
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: This endpoint retrieves all products with pagination.
 *     tags: [Products]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of products per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: productName
 *         in: query
 *         description: Filter products by name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Update a specific product
 *     description: This endpoint allows authenticated users to update a product by its ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               attributes:
 *                 type: array
 *                 description: List of attributes associated with the product.
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Unique identifier for the attribute (UUID format)
 *                       example: "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e"  # Example UUID for attribute ID
 *                     value:
 *                       type: string
 *                       description: The value of the attribute
 *                 example:
 *                   - id: "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e"
 *                     value: "Sample Attribute Value"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a specific product
 *     description: This endpoint allows authenticated users to delete a product by its ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Product not found
 */
// /**
//  * @swagger
//  * /api/products/attribute/{proAttrId}:
//  *   delete:
//  *     summary: Delete a specific product attribute
//  *     description: This endpoint allows authenticated users to delete a product attribute by its ID.
//  *     tags: [Products]
//  *     security:
//  *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
//  *     parameters:
//  *       - name: proAttrId
//  *         in: path
//  *         required: true
//  *         description: ID of the product attribute to delete
//  *         schema:
//  *           type: string
//  *     responses:
//  *       204:
//  *         description: Product attribute deleted successfully
//  *       401:
//  *         description: Unauthorized, user not authenticated
//  *       404:
//  *         description: Product attribute not found
//  */
// /**
//  * @swagger
//  * /api/products/filter:
//  *   get:
//  *     summary: Filter products by sub-attributes
//  *     description: This endpoint retrieves products that match the provided sub-attribute IDs.
//  *     tags: [Products]
//  *     parameters:
//  *       - name: subAttrIds
//  *         in: query
//  *         required: true
//  *         description: List of sub-attribute UUIDs to filter products
//  *         schema:
//  *           type: array
//  *           items:
//  *             type: string
//  *           example: ["e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e", "d9f7a1d2-4b3f-5d1b-b8c1-6e3f4c6e9b9f"]
//  *     responses:
//  *       200:
//  *         description: Filtered products retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 response:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       id:
//  *                         type: string
//  *                       productName:
//  *                         type: string
//  *                       price:
//  *                         type: number
//  *                       rating:
//  *                         type: number
//  *                       description:
//  *                         type: string
//  *                       coverImage:
//  *                         type: object
//  *                         nullable: true
//  *                         properties:
//  *                           id:
//  *                             type: string
//  *                 error:
//  *                   type: string
//  *       400:
//  *         description: Validation error
//  *       404:
//  *         description: No products found for the selected sub-attributes
//  */
// /**
//  * @swagger
//  * /api/products/filter:
//  *   get:
//  *     summary: Filter products by sub-attributes
//  *     description: This endpoint retrieves products that match the provided sub-attribute IDs.
//  *     tags: [Products]
//  *     parameters:
//  *       - name: subAttrIds
//  *         in: query
//  *         required: true
//  *         description: Comma-separated list of sub-attribute UUIDs to filter products (e.g., "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e,d9f7a1d2-4b3f-5d1b-b8c1-6e3f4c6e9b9f")
//  *         schema:
//  *           type: string
//  *           example: "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e,d9f7a1d2-4b3f-5d1b-b8c1-6e3f4c6e9b9f"
//  *     responses:
//  *       200:
//  *         description: Filtered products retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 response:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       id:
//  *                         type: string
//  *                       productName:
//  *                         type: string
//  *                       price:
//  *                         type: number
//  *                       rating:
//  *                         type: number
//  *                       coverImage:
//  *                         type: object
//  *                         nullable: true
//  *                         properties:
//  *                           id:
//  *                             type: string
//  *                 error:
//  *                   type: string
//  *       400:
//  *         description: Validation error
//  *       404:
//  *         description: No products found for the selected sub-attributes
//  */

/**
 * @swagger
 * /api/products/filter/{categoryId}:
 *   get:
 *     summary: Filter products by sub-attributes
 *     description: This endpoint retrieves products that match the provided sub-attribute IDs and supports pagination, sorting, and searching by product name.
 *     tags: [Products]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to add the product to
 *         schema:
 *           type: string
 *       - name: subAttrIds
 *         in: query
 *         required: false
 *         description: Comma-separated list of sub-attribute UUIDs to filter products (e.g., "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e,d9f7a1d2-4b3f-5d1b-b8c1-6e3f4c6e9b9f")
 *         schema:
 *           type: string
 *           example: "e7f3a1d1-3f1b-4c8e-b6b0-5e2f3c5d7a8e,d9f7a1d2-4b3f-5d1b-b8c1-6e3f4c6e9b9f"
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of products per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         required: false
 *         description: Sorting options (e.g., "cheapest", "mostExpensive", "newest")
 *         schema:
 *           type: string
 *           enum:
 *             - cheapest
 *             - mostExpensive
 *             - newest
 *       - name: productName
 *         in: query
 *         description: Filter products by name
 *         required: false
 *         schema:
 *           type: string
 *           example: "Sample Product"
 *     responses:
 *       200:
 *         description: Filtered products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       productName:
 *                         type: string
 *                       price:
 *                         type: number
 *                       rating:
 *                         type: number
 *                       description:
 *                         type: string
 *                       coverImage:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: string
 *                 totalPages:
 *                   type: integer
 *                 totalProducts:
 *                   type: integer
 *       400:
 *         description: Validation error
 *       404:
 *         description: No products found for the selected filters
 */
