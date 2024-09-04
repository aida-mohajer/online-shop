import { Response } from "express";
import { CustomRequest } from "../middlewares/authentication";
import { OrderService } from "../order/order.service";

export class OrderController {
  constructor(private orderService: OrderService) {}
  async createOrder(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    const result = await this.orderService.createOrder(cartId, userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getOrder(req: CustomRequest, res: Response): Promise<Response> {
    const orderId: string = req.params.orderId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.orderService.getOrder(orderId, userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAllOrders(req: CustomRequest, res: Response): Promise<Response> {
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
      const result = await this.orderService.getAllOrders(pagination, userId);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error retrieving order items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
