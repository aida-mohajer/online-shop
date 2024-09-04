import { ReadGetCartItemDto } from "./read-get-cartItem.dto";

export class ReadGetAllCartItems {
  cartItemDto?: ReadGetCartItemDto[];
  totalPages?: number;
  totalCartItems?: number;
  error?: string;
}
