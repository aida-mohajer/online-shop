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
import path from "path";
import { productImageRouter } from "./product-images/product-image.routes";
import { uploadImageRouter } from "./upload/image.routes";
import { attributeRouter } from "./attributes/attribute.routes";
import { subAttrRouter } from "./sub-attributes/sub-attr.routes";
import cookieParser from "cookie-parser";
import "./cron-jobs";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/originals",
  express.static(path.join(__dirname, "../src/public/images/originals"))
);
app.use(
  "/optimized",
  express.static(path.join(__dirname, "../src/public/images/optimized"))
);

app.use("/api/users/", usersRouter);
app.use("/api/products/", productRouter);
app.use("/api/categories/", categoryRouter);
app.use("/api/cart-items/", cartRouter);
app.use("/api/wishlist/", wishlistRouter);
app.use("/api/orders/", orderRouter);
app.use("/api/feedbacks/", feedbackRouter);
app.use("/api/images/", uploadImageRouter);
app.use("/api/product/images/", productImageRouter);
app.use("/api/attributes/", attributeRouter);
app.use("/api/sub-attr/", subAttrRouter);

app.use(errorHandler);

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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
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
