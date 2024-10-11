import { Order } from "../../entities/order.entity";

export class ReadGetAllOrders {
  response?: Order[];
  totalOrders?: number;
  message?: string;
  error?: string;
}
