import express from "express";
import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { authentication, CustomRequest } from "../middlewares/authentication";
import { validateProductId } from "./validations/productId.validation";
import { validateUpdateProductDto } from "./validations/update-product.validation";
import { validateCategoryId } from "../categories/validations/categoryId.validation";
import { pagination } from "../middlewares/pagination";
import { validateProductDto } from "./validations/product.validation";
import { search } from "../middlewares/search";
import { validateQuerySubAttrIds } from "./validations/subAttrIds-query.validation";
import { trackCategoryView } from "../middlewares/category-views";

export const productRouter = express.Router();
const productService = new ProductService();
const productController = new ProductController(productService);

productRouter.get(
  "/filter/:categoryId",
  validateCategoryId,
  pagination,
  search,
  validateQuerySubAttrIds,
  async (req: Request, res: Response) => {
    return await productController.filterProducts(req, res);
  }
);

productRouter.post(
  "/:categoryId",
  authentication,
  validateCategoryId,
  validateProductDto,
  async (req: CustomRequest, res: Response) => {
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

productRouter.get(
  "/:categoryId/category",
  validateCategoryId,
  trackCategoryView,
  async (req: Request, res: Response) => {
    console.log(req.headers);
    console.log(req.cookies);
    return await productController.getCategoryProducts(req, res);
  }
);

productRouter.get(
  "",
  pagination,
  search,
  async (req: Request, res: Response) => {
    return await productController.getAllProducts(req, res);
  }
);

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
// productRouter.get(
//   "/filter",
//   validateQuerySubAttrIds,
//   async (req: Request, res: Response) => {
//     return await productController.filterProductsBySubAttributes(req, res);
//   }
// );
