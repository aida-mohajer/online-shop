import { Wishlist } from "../../entities/wishlist.entity";

export class ReadGetAllWishlistItems {
  response?: Wishlist[];
  totalWishlistItems?: number;
  message?: string;
  error?: string;
}
