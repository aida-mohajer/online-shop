import { Response } from "express";
import { ProductService } from "./product.service";
import { CustomRequest } from "../middlewares/authentication";
import { ProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

export class ProductController {
  constructor(private productService: ProductService) {}
  async addProduct(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId = req.params.categoryId;
    const data: ProductDto = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    console.log(role);

    const result = await this.productService.addProduct(
      data,
      userId,
      categoryId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getProduct(req: CustomRequest, res: Response): Promise<Response> {
    const productId = req.params.productId;
    const result = await this.productService.getProduct(productId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAllProducts(req: CustomRequest, res: Response): Promise<Response> {
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    try {
      const result = await this.productService.getAllProducts(pagination);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error retrieving products:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProduct(req: CustomRequest, res: Response): Promise<Response> {
    const data: UpdateProductDto = req.body;
    const productId = req.params.productId;

    const role = req.user?.role;
    console.log(role);
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.productService.updateProduct(productId, data);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteProduct(req: CustomRequest, res: Response): Promise<Response> {
    const productId = req.params.productId;

    const role = req.user?.role;
    console.log(role);
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.productService.deleteProduct(productId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
