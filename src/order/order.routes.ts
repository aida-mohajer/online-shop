import { Request, Response } from "express";
import express from "express";
import { authentication } from "../middlewares/authentication";
import { pagination } from "../middlewares/pagination";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { validateCartId } from "../cart/validations/cartId.validation";
import { validateOrderId } from "./validations/orderId.validation";

export const orderRouter = express.Router();
const orderService = new OrderService();
const orderController = new OrderController(orderService);

orderRouter.post(
  "/order/:cartId",
  authentication,
  validateCartId,
  async (req: Request, res: Response) => {
    return await orderController.createOrder(req, res);
  }
);

orderRouter.get(
  "/order/:orderId",
  authentication,
  validateOrderId,
  async (req: Request, res: Response) => {
    return await orderController.getOrder(req, res);
  }
);

orderRouter.get(
  "/orders",
  authentication,
  pagination,
  async (req: Request, res: Response) => {
    return await orderController.getAllOrders(req, res);
  }
);
