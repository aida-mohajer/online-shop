/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management operations
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
 * /api/wishlist/add-remove/item/{productId}:
 *   post:
 *     summary: Add or remove an item from the wishlist
 *     description: This endpoint allows authenticated users to add or remove a product from their wishlist.
 *     tags: [Wishlist]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to add or remove
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: Item added or removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/wishlist/item/{wishlistId}:
 *   get:
 *     summary: Get a specific item from the wishlist
 *     description: This endpoint retrieves a specific item from the user's wishlist by its ID.
 *     tags: [Wishlist]
 *     parameters:
 *       - name: wishlistId
 *         in: path
 *         required: true
 *         description: ID of the wishlist item to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: Wishlist item retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Wishlist item not found
 */

/**
 * @swagger
 * /api/wishlist/items:
 *   get:
 *     summary: Get all items in the wishlist
 *     description: This endpoint retrieves all items in the user's wishlist.
 *     tags: [Wishlist]
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
 *         description: Number of blogs per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: List of all wishlist items retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
