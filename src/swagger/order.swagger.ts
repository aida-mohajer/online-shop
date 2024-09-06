// src/swagger/order.swagger.ts

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management operations
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
 * /api/orders/{cartId}:
 *   post:
 *     summary: Create an order from a cart
 *     description: This endpoint allows authenticated users to create an order using a cart ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         description: ID of the cart to create an order from
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Cart not found
 */

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get a specific order
 *     description: This endpoint retrieves a specific order by its ID.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: This endpoint retrieves all orders for the authenticated user with pagination.
 *     tags: [Orders]
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
 *         description: List of orders retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
