import { AppDataSource } from "../data-source";
import { CartItem } from "../entities/cartItem.entity";
import { Order } from "../entities/order.entity";
import { ReadGetOrderDto } from "./dto/read-get-order.dto";
import { ReadGetAllOrders } from "./dto/read-getAll-orders.dto";
import { ReadMakeOrderDto } from "./dto/read-make-order.dto";

export class OrderService {
  constructor(
    private orderRepository = AppDataSource.getRepository(Order),
    private cartRepository = AppDataSource.getRepository(CartItem)
  ) {}
  async createOrder(cartId: string, userId: string): Promise<ReadMakeOrderDto> {
    try {
      const cartItem = await this.cartRepository.findOne({
        where: { id: cartId, userId: userId },
        relations: ["product"],
      });
      if (!cartItem) {
        return { error: "This product isnt in your cart" };
      }

      const totalPrice = cartItem.quantity * cartItem.product.price;
      const newOrder = this.orderRepository.create({
        userId: cartItem.userId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        totalPrice: totalPrice,
      });
      await this.orderRepository.save(newOrder);

      await this.cartRepository.delete({ userId });

      return {
        message: "Order created successfully",
      };
    } catch (error) {
      console.error("Error during making order", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async getOrder(orderId: string, userId: string): Promise<ReadGetOrderDto> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderId, userId },
        relations: ["product"],
      });

      if (!order) {
        return { error: "Order not found" };
      }

      const totalPrice = order.quantity * order.product.price;
      return {
        productName: order.product.productName,
        quantity: order.quantity,
        totalPrice: totalPrice,
      };
    } catch (error) {
      console.error("Error during retrieve an order", error);
      return { error: "An unexpected error occured" };
    }
  }

  async getAllOrders(userId: string): Promise<ReadGetAllOrders> {
    try {
      const queryBuilder = this.orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.product", "product")
        .select([
          "product.productName",
          "product.price",
          "product.description",
          "order.id",
          "order.createdAt",
          "order.quantity",
        ])
        .where("order.userId = :userId", { userId })
        .orderBy("order.createdAt");

      const [orders, totalOrders] = await queryBuilder.getManyAndCount();

      const ordersWithTotalPrice = orders.map((order) => ({
        ...order,
        totalPrice: order.quantity * order.product.price,
      }));

      return {
        message:
          totalOrders > 0
            ? "Orders items retrieved successfully"
            : "No order item found matching the search criteria.",
        response: ordersWithTotalPrice,
        totalOrders,
      };
    } catch (error) {
      console.error("Error during retrieve order items:", error);
      return { error: "Internal server error" };
    }
  }
}
