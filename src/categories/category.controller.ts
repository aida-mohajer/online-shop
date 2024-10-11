import { Response } from "express";
import { CategoryService } from "./category.service";
import { CustomRequest } from "../middlewares/authentication";
import { CategoryDto } from "./dto/category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  async createCategory(req: CustomRequest, res: Response): Promise<Response> {
    const data: CategoryDto = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }

    const result = await this.categoryService.createCategory(userId, data);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getCategory(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId: string = req.params.categoryId;
    const result = await this.categoryService.getCategory(categoryId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAllCategories(req: CustomRequest, res: Response): Promise<Response> {
    const search = req.search;
    if (!search) {
      return res.status(400).json({ error: "Search parameters are missing" });
    }
    try {
      const result = await this.categoryService.getAllCategories(search);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error retrieving categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCategory(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId: string = req.params.categoryId;
    const data: UpdateCategoryDto = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.categoryService.updateCategory(
      userId,
      data,
      categoryId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteCategory(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId: string = req.params.categoryId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.categoryService.deleteCategory(
      userId,
      categoryId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
