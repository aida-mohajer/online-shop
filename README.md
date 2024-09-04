# 🛒 Online Shop

A simple e-commerce application built with **Express.js**, **TypeScript**, **TypeORM**, and **Microsoft SQL Server (MSSQL)**.

## 🌟 Features

- 👤 User authentication (register/login)
- 📦 Product management (CRUD operations)
- 🛍️ Shopping cart functionality
- ❤️ Wishlist management
- 📦 Order processing
- 💬 Feedback system
- 📂 Category management

## 🛠️ Technologies

- Node.js
- Express.js
- TypeScript
- TypeORM
- MSSQL

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js
- Microsoft SQL Server
- TypeScript

### 📥 Installation

1. Clone the repo:

   ```bash
   https://github.com/aida-mohajer/online-shop.git
   cd online-shop
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure `ormconfig.json` for your database.

4. Start the application:
   ```bash
   npm run start
   ```

## 📡 API Endpoints

- **User**:

  - `POST /api/users/signup`: Sign up a new user
  - `POST /api/users/login`: Login an existing user
  - `GET /api/users/get-user`: Get an existing user
  - `PUT /api/users/update-user`: Update an existing user
  - `DELETE /api/users/delete-user`: Delete an existing user

- **Products**:

  - `GET /api/users/products`: Get all products
  - `GET /api/users/product/productId`: Get a product
  - `POST /api/users/product/:categoryId`: Add a new product to a category
  - `PUT /api/users/product/:productId`: Update a product
  - `DELETE /api/users/product/:productId`: Delete a product

- **Cart**:

  - `GET /api/users/cart/items`: Get current user's cart
  - `GET /api/users/cart/item/:cartId`: Get item from user's cart
  - `POST /api/users/cart/item/:productId`: Add item to cart
  - `PUT /api/users/cart/item/:cartId`: Update cart item
  - `DELETE /api/users/cart/item/:cartId`: Remove item from cart

- **Wishlist**:

  - `POST /api/users/add-remove/wishlist/item/:productId`: Add/remove item to wishlist
  - `GET /api/users/wishlist/item/:wishlistId`: Get an item from wishlist
  - `GET /api/users/wishlist/items`: Get current user's wishlist

- **Orders**:

  - `GET /api/users/orders`: Get all orders for the user
  - `GET /api/order/users/:orderId`: Get an order of a the user
  - `POST /api/users/:cartId`: Place a new order from its cart

- **Feedback**:

  - `POST /api/users/feedback/:productId`: Leave feedback for a product
  - `GET /api/users/feedbacks/:productId`: Get feedbacks of a product
  - `PUT /api/users/feedback/:feedbackId`: Update feedback for a product
  - `DELETE /api/users/feedback/:feedbackId`: Delete a feedback for a product

- **Categories**:
  - `GET /api/users/categories`: Get all categories
  - `GET /api/users/category/:categoryId`: Get a category
  - `POST /api/users/category`: Add a new category
  - `DELETE /api/users/category/:categoryId`: Delete a category
