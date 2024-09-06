import { Request, Response } from "express";
import express from "express";
import { authentication } from "../middlewares/authentication";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { validateProductId } from "../products/validations/productId.validation";
import { validateCartId } from "./validations/cartId.validation";
import { pagination } from "../middlewares/pagination";
import { validateCartItemDto } from "./validations/cartItem.validation";

export const cartRouter = express.Router();
const cartService = new CartService();
const cartcontroller = new CartController(cartService);

cartRouter.post(
  "/:productId",
  authentication,
  validateProductId,
  validateCartItemDto,
  async (req: Request, res: Response) => {
    return await cartcontroller.addCartItem(req, res);
  }
);

cartRouter.get(
  "/:cartId",
  authentication,
  validateCartId,
  async (req: Request, res: Response) => {
    return await cartcontroller.getCartItem(req, res);
  }
);

cartRouter.get(
  "",
  authentication,
  pagination,
  async (req: Request, res: Response) => {
    return await cartcontroller.getAllCartItems(req, res);
  }
);

cartRouter.put(
  "/:cartId",
  authentication,
  validateCartId,
  validateCartItemDto,
  async (req: Request, res: Response) => {
    return await cartcontroller.updateCartItem(req, res);
  }
);

cartRouter.delete(
  "/:cartId",
  authentication,
  validateCartId,
  async (req: Request, res: Response) => {
    return await cartcontroller.deleteCartItem(req, res);
  }
);
