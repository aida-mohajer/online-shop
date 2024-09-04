import { Request, Response } from "express";
import express from "express";
import { authentication } from "../middlewares/authentication";
import { validateProductId } from "../products/validations/productId.validation";
import { WishlistService } from "./wishlist.service";
import { WishlistController } from "./wishlist.controller";
import { validateWishlistId } from "./validations/wishlistId.validation";
import { pagination } from "../middlewares/pagination";

export const wishlistRouter = express.Router();
const wishlistService = new WishlistService();
const wishlistController = new WishlistController(wishlistService);

wishlistRouter.post(
  "/add-remove/wishlist/item/:productId",
  authentication,
  validateProductId,
  async (req: Request, res: Response) => {
    return await wishlistController.addItem(req, res);
  }
);

wishlistRouter.get(
  "/wishlist/item/:wishlistId",
  authentication,
  validateWishlistId,
  async (req: Request, res: Response) => {
    return await wishlistController.getItem(req, res);
  }
);

wishlistRouter.get(
  "/wishlist/items",
  authentication,
  pagination,
  async (req: Request, res: Response) => {
    return await wishlistController.getAllItems(req, res);
  }
);
