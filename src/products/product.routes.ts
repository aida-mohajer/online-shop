import express from "express";
import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { authentication } from "../middlewares/authentication";
import { validateProductId } from "./validations/productId.validation";
import { validateUpdateProductDto } from "./validations/update-product.validation";
import { validateCategoryId } from "../categories/validations/categoryId.validation";
import { pagination } from "../middlewares/pagination";
import { validateProductDto } from "./validations/product.validation";

export const productRouter = express.Router();
const productService = new ProductService();
const productController = new ProductController(productService);

productRouter.post(
  "/:categoryId",
  authentication,
  validateCategoryId,
  validateProductDto,
  async (req: Request, res: Response) => {
    return await productController.addProduct(req, res);
  }
);

productRouter.get(
  "/:productId",
  validateProductId,
  async (req: Request, res: Response) => {
    return await productController.getProduct(req, res);
  }
);

productRouter.get("", pagination, async (req: Request, res: Response) => {
  return await productController.getAllProducts(req, res);
});

productRouter.put(
  "/:productId",
  authentication,
  validateProductId,
  validateUpdateProductDto,
  async (req: Request, res: Response) => {
    return await productController.updateProduct(req, res);
  }
);

productRouter.delete(
  "/:productId",
  authentication,
  validateProductId,
  async (req: Request, res: Response) => {
    return await productController.deleteProduct(req, res);
  }
);
