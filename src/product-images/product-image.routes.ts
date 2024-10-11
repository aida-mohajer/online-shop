import express, { Response } from "express";
import { authentication, CustomRequest } from "../middlewares/authentication";
import { validateProductId } from "../products/validations/productId.validation";
import { validateImageId } from "./validations/imageId.validation";
import { validateUpdateImageDto } from "./validations/update-image.validation";
import { ProductImageService } from "./product-image.service";
import { ProductImageController } from "./product-image.controller";
import { validateCreateImageDto } from "./validations/create-image.validation";

export const productImageRouter = express.Router();
const productImageService = new ProductImageService();
const productImageController = new ProductImageController(productImageService);

productImageRouter.post(
  "/:productId",
  authentication,
  validateProductId,
  validateCreateImageDto,
  async (req: CustomRequest, res: Response) => {
    return await productImageController.createProductImage(req, res);
  }
);

productImageRouter.get(
  "/:productId",
  validateProductId,
  async (req: CustomRequest, res: Response) => {
    return await productImageController.getProductImages(req, res);
  }
);

productImageRouter.put(
  "/:imageId",
  authentication,
  validateImageId,
  validateUpdateImageDto,
  async (req: CustomRequest, res: Response) => {
    return await productImageController.updateProductImage(req, res);
  }
);

productImageRouter.delete(
  "/:imageId",
  authentication,
  validateImageId,
  async (req: CustomRequest, res: Response) => {
    return await productImageController.deleteProductImage(req, res);
  }
);
