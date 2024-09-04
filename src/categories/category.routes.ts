import { Request, Response } from "express";
import express from "express";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { authentication } from "../middlewares/authentication";
import { validateCategoryId } from "./validations/categoryId.validation";
import { pagination } from "../middlewares/pagination";
import { validateCategoryDto } from "./validations/category.validation";

export const categoryRouter = express.Router();
const categoryService = new CategoryService();
const categorycontroller = new CategoryController(categoryService);

categoryRouter.post(
  "/category",
  authentication,
  validateCategoryDto,
  async (req: Request, res: Response) => {
    return await categorycontroller.createCategory(req, res);
  }
);

categoryRouter.get(
  "/category/:categoryId",
  validateCategoryId,
  async (req: Request, res: Response) => {
    return await categorycontroller.getCategory(req, res);
  }
);

categoryRouter.get(
  "/categories",
  pagination,
  async (req: Request, res: Response) => {
    return await categorycontroller.getAllCategories(req, res);
  }
);

categoryRouter.put(
  "/category/:categoryId",
  authentication,
  validateCategoryId,
  async (req: Request, res: Response) => {
    return await categorycontroller.updateCategory(req, res);
  }
);

categoryRouter.delete(
  "/category/:categoryId",
  authentication,
  validateCategoryId,
  async (req: Request, res: Response) => {
    return await categorycontroller.deleteCategory(req, res);
  }
);
