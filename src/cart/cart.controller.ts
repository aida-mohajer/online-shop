import { Response } from "express";
import { CustomRequest } from "../middlewares/authentication";
import { CartService } from "./cart.service";
import { CartItemDto } from "./dto/cartItem.dto";

export class CartController {
  constructor(private cartService: CartService) {}
  async addCartItem(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "NO userId" });
    }
    const productId = req.params.productId;
    const data: CartItemDto = req.body;

    const result = await this.cartService.addCartItem(productId, userId, data);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getCartItem(req: CustomRequest, res: Response): Promise<Response> {
    const cartId: string = req.params.cartId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No  userId" });
    }
    const result = await this.cartService.getCartItem(cartId, userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAllCartItems(req: CustomRequest, res: Response): Promise<Response> {
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const result = await this.cartService.getAllCartItems(pagination, userId);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error retrieving cart items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCartItem(req: CustomRequest, res: Response): Promise<Response> {
    const cartId: string = req.params.cartId;
    const data: CartItemDto = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No  userId" });
    }

    const result = await this.cartService.updateCartItem(cartId, userId, data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteCartItem(req: CustomRequest, res: Response): Promise<Response> {
    const cartId: string = req.params.cartId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unathorized" });
    }

    const result = await this.cartService.deleteCartItem(userId, cartId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
