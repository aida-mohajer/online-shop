/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management operations
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
 * /api/cart-items/{cartId}:
 *   get:
 *     summary: Get a specific cart item
 *     description: This endpoint retrieves a specific item in the user's cart by its ID.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart item to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Cart item not found
 */

/**
 * @swagger
 * /api/cart-items:
 *   get:
 *     summary: Get all cart items
 *     description: This endpoint retrieves all items in the user's cart with pagination.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: List of cart items retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/cart-items/{productId}:
 *   post:
 *     summary: Add an item to the cart
 *     description: This endpoint allows authenticated users to add a product to their cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to add to the cart
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /api/cart-items/{cartId}:
 *   put:
 *     summary: Update a specific cart item
 *     description: This endpoint allows authenticated users to update a cart item by its ID.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Cart item not found
 */

/**
 * @swagger
 * /api/cart-items/{cartId}:
 *   delete:
 *     summary: Delete a specific cart item
 *     description: This endpoint allows authenticated users to delete a cart item by its ID.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart item to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cart item deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Cart item not found
 */
