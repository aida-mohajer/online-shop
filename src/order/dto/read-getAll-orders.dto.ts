import { ReadGetOrderDto } from "./read-get-order.dto";

export class ReadGetAllOrders {
  orderItemDto?: ReadGetOrderDto[];
  totalPages?: number;
  totalOrders?: number;
  error?: string;
}
