import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./middlewares/errorHandler";
import { usersRouter } from "./users/user.routes";
import { productRouter } from "./products/product.routes";
import { categoryRouter } from "./categories/category.routes";
import { cartRouter } from "./cart/cart.routes";
import { wishlistRouter } from "./wishlist/wishlist.routes";
import { orderRouter } from "./order/order.routes";
import { feedbackRouter } from "./feedbacks/feedback.routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use("/api/users/", usersRouter);
app.use("/api/products/", productRouter);
app.use("/api/categories/", categoryRouter);
app.use("/api/cart-items/", cartRouter);
app.use("/api/wishlist/", wishlistRouter);
app.use("/api/orders/", orderRouter);
app.use("/api/feedbacks/", feedbackRouter);

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: [path.join(__dirname, "./swagger/*.ts")],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    },
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log("http://localhost:3000/api-docs/");

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
