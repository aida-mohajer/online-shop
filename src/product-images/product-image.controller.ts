import { Response } from "express";
import path from "path";
import fs from "fs";
import { CustomRequest } from "../middlewares/authentication";
import { CreateImageDto } from "./dto/create-image.dto";
import { ProductImageService } from "./product-image.service";

export class ProductImageController {
  constructor(private productImageService: ProductImageService) {}

  async createProductImage(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const data: CreateImageDto = req.body;
    const productId = req.params.productId;

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }

    const imageFile = path.join(
      __dirname,
      "../public/images/originals",
      data.imageName
    );

    // Check if the file exists
    if (!fs.existsSync(imageFile)) {
      return res.status(400).json({ error: "Image file does not exist" });
    }

    const result = await this.productImageService.createProductImage(
      userId,
      productId,
      data
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);
  }

  async getProductImages(req: CustomRequest, res: Response): Promise<Response> {
    const productId = req.params.productId;
    const result = await this.productImageService.getProductImages(productId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  }
  async updateProductImage(req: CustomRequest, res: Response) {
    const imageId = req.params.imageId;
    const data = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const result = await this.productImageService.updateProductImage(
      userId,
      imageId,
      data
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  }

  async deleteProductImage(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const imageId = req.params.imageId;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await this.productImageService.deleteProductImage(
      userId,
      imageId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  }
}
