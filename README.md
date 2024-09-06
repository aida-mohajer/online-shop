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
  - `GET /api/users`: Get an existing user
  - `PUT /api/users`: Update an existing user
  - `DELETE /api/users`: Delete an existing user

- **Products**:

  - `GET /api/products`: Get all products
  - `GET /api/products/productId`: Get a product
  - `POST /api/products/:categoryId`: Add a new product to a category
  - `PUT /api/products/:productId`: Update a product
  - `DELETE /api/products/:productId`: Delete a product

- **Cart**:

  - `GET /api/cart-items`: Get current user's cart
  - `GET /api/cart-items/:cartId`: Get item from user's cart
  - `POST /api/cart-items/:productId`: Add item to cart
  - `PUT /api/cart-items/:cartId`: Update cart item
  - `DELETE /api/cart-items/:cartId`: Remove item from cart

- **Wishlist**:

  - `POST /api/wishlist/add-remove/item/:productId`: Add/remove item to wishlist
  - `GET /api/wishlist/item/:wishlistId`: Get an item from wishlist
  - `GET /api/wishlist/items`: Get current user's wishlist

- **Orders**:

  - `GET /api/orders`: Get all orders for the user
  - `GET /api/orders/:orderId`: Get an order of a the user
  - `POST /api/orders/:cartId`: Place a new order from its cart

- **Feedback**:

  - `POST /api/feedbacks/:productId`: Leave feedback for a product
  - `GET /api/feedbacks/:productId`: Get feedbacks of a product
  - `PUT /api/feedbacks/:feedbackId`: Update feedback for a product
  - `DELETE /api/feedbacks/:feedbackId`: Delete a feedback for a product

- **Categories**:
  - `GET /api/categories`: Get all categories
  - `GET /api/categories/:categoryId`: Get a category
  - `POST /api/categories`: Add a new category
  - `DELETE /api/categories/:categoryId`: Delete a category
