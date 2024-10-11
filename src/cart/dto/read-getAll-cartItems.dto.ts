import { CartItem } from "../../entities/cartItem.entity";

export class ReadGetAllCartItems {
  response?: CartItem[];
  totalCartItems?: number;
  message?: string;
  error?: string;
}
