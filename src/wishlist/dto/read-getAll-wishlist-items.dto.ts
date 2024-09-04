import { ReadGetWishlistItemDto } from "./read-get-wishlist-item.dto";

export class ReadGetAllWishlistItems {
  wishlistDto?: ReadGetWishlistItemDto[];
  totalPages?: number;
  totalWishlistItems?: number;
  error?: string;
}
