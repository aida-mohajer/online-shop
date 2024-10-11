import { Response } from "express";
import { ProductService } from "./product.service";
import { CustomRequest } from "../middlewares/authentication";
import { ProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

export class ProductController {
  constructor(private productService: ProductService) {}
  async addProduct(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId = req.params.categoryId;
    const productData: ProductDto = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }

    const result = await this.productService.addProduct(
      userId,
      productData,
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

  async getCategoryProducts(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const categoryId = req.params.categoryId;

    const result = await this.productService.getCategoryProducts(categoryId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAllProducts(req: CustomRequest, res: Response): Promise<Response> {
    const search = req.search;
    if (!search) {
      return res.status(400).json({ error: "search parameter are missing" });
    }
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    try {
      const result = await this.productService.getAllProducts(
        pagination,
        search
      );
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error retrieving products:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateProduct(req: CustomRequest, res: Response): Promise<Response> {
    const data: UpdateProductDto = req.body;
    const productId = req.params.productId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.productService.updateProduct(
      userId,
      productId,
      data
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async deleteProduct(req: CustomRequest, res: Response): Promise<Response> {
    const productId = req.params.productId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.productService.deleteProduct(userId, productId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async filterProducts(req: CustomRequest, res: Response): Promise<Response> {
    const categoryId = req.params.categoryId;
    const subAttrIds = req.query.subAttrIds?.toString().split(",") || [];
    const pagination = req.pagination;
    const search = req.search;
    if (!search) {
      return res.status(400).json({ error: "search parameter are missing" });
    }
    const sortBy = req.query.sortBy as string;

    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing." });
    }

    const result = await this.productService.filterProducts(
      categoryId,
      pagination,
      sortBy,
      search,
      subAttrIds
    );

    if (result.error) {
      console.error(result.error);
    } else {
      console.log("Filtered Products:", result.response);
    }
    return res.status(200).json(result);
  }
}

// async filterProductsBySubAttributes(
//   req: CustomRequest,
//   res: Response
// ): Promise<Response> {
//   const subAttrIds = req.query.subAttrIds?.toString().split(",") || [];
//   const result = await this.productService.filterProductsBySubAttributes(
//     subAttrIds
//   );
//   if (result.error) {
//     console.error(result.error);
//   } else {
//     console.log("Filtered Products:", result.response);
//   }
//   return res.status(200).json(result);
// }
