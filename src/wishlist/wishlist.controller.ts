import { Response } from "express";
import { CustomRequest } from "../middlewares/authentication";
import { WishlistService } from "./wishlist.service";

export class WishlistController {
  constructor(private wishlistService: WishlistService) {}
  async addItem(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const productId = req.params.productId;

    const result = await this.wishlistService.addItem(productId, userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getItem(req: CustomRequest, res: Response): Promise<Response> {
    const wishlistId: string = req.params.wishlistId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "UserId not found" });
    }
    const result = await this.wishlistService.getItem(wishlistId, userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAllItems(req: CustomRequest, res: Response): Promise<Response> {
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    try {
      const result = await this.wishlistService.getAllItems(pagination, userId);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error retrieving wishlist items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
