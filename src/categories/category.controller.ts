import { Response } from "express";
import { CategoryService } from "./category.service";
import { CustomRequest } from "../middlewares/authentication";
import { CategoryDto } from "./dto/category.dto";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  async createCategory(req: CustomRequest, res: Response): Promise<Response> {
    const data: CategoryDto = req.body;
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }

    const result = await this.categoryService.createCategory(data);

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
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    try {
      const result = await this.categoryService.getAllCategories(pagination);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error retrieving categories:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCategory(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId: string = req.params.categoryId;
    const data: CategoryDto = req.body;
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.categoryService.updateCategory(data, categoryId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteCategory(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId: string = req.params.categoryId;
    const result = await this.categoryService.deleteCategory(categoryId);
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
