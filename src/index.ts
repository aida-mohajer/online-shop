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

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use("/api/users/", usersRouter);
app.use("/api/users/", productRouter);
app.use("/api/users/", categoryRouter);
app.use("/api/users/", cartRouter);
app.use("/api/users/", wishlistRouter);
app.use("/api/users/", orderRouter);
app.use("/api/users/", feedbackRouter);
const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
