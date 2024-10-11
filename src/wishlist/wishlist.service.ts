import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { Wishlist } from "../entities/wishlist.entity";
import { ReadAddWishlistItemDto } from "./dto/read-add-wishlist-item.dto";
import { ReadGetWishlistItemDto } from "./dto/read-get-wishlist-item.dto";
import { ReadGetAllWishlistItems } from "./dto/read-getAll-wishlist-items.dto";

export class WishlistService {
  constructor(
    private productRepository = AppDataSource.getRepository(Product),
    private userRepository = AppDataSource.getRepository(User),
    private wishlistRepository = AppDataSource.getRepository(Wishlist)
  ) {}
  async addItem(
    productId: string,
    userId: string
  ): Promise<ReadAddWishlistItemDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { error: "User not found" };
      }
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        return { error: "Product not found" };
      }

      const existWishlistItem = await this.wishlistRepository.findOne({
        where: { productId: productId },
      });

      if (existWishlistItem) {
        await this.wishlistRepository.remove(existWishlistItem);
        return { message: "product removed from wishlist" };
      }
      const wishlist = this.wishlistRepository.create({
        userId: user.id,
        productId: product.id,
      });
      await this.wishlistRepository.save(wishlist);
      return {
        productName: product.productName,
        description: product.description,
        price: product.price,
        addedAt: product.createdAt,
      };
    } catch (error) {
      console.error("Error during adding items to wishlist", error);
      return { error: "An unexpected error occured" };
    }
  }

  async getItem(
    wishlistId: string,
    userId: string
  ): Promise<ReadGetWishlistItemDto> {
    try {
      const wishlistItem = await this.wishlistRepository.findOne({
        where: { id: wishlistId },
        relations: ["product"],
      });
      if (!wishlistItem) {
        return { error: "Wishlist Item not found" };
      }

      if (wishlistItem.userId !== userId) {
        return {
          error: "You are not authorized to retrieve this wishlist item",
        };
      }
      const dto = new ReadGetWishlistItemDto();
      return {
        productName: wishlistItem.product.productName,
        description: wishlistItem.product.description,
        price: wishlistItem.product.price,
        createdAt: wishlistItem.createdAt,
      };
    } catch (error) {
      console.error("Error during retrieve a wishlist item", error);
      return { error: "An unexpected error occured" };
    }
  }

  async getAllItems(userId: string): Promise<ReadGetAllWishlistItems> {
    try {
      const queryBuilder = this.wishlistRepository
        .createQueryBuilder("wishlist")
        .leftJoinAndSelect("wishlist.product", "product")
        .select([
          "wishlist.id",
          "product.id",
          "product.productName",
          "product.price",
          "product.description",
          "wishlist.createdAt",
        ])
        .where("wishlist.userId = :userId", { userId })
        .orderBy("product.price", "DESC");

      const [allWishlistItems, totalWishlistItems] =
        await queryBuilder.getManyAndCount();

      return {
        message:
          totalWishlistItems > 0
            ? "Wishlist items retrieved successfully"
            : "No wishlist items found matching the search criteria.",
        response: allWishlistItems,
        totalWishlistItems,
      };
    } catch (error) {
      console.error("Error during retrieve wishlist items:", error);
      return { error: "Internal server error" };
    }
  }
}
