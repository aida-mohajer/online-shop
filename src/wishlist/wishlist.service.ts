import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { Wishlist } from "../entities/wishlist.entity";
import { Pagination } from "../middlewares/pagination";
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

  async getAllItems(
    pagination: Pagination,
    userId: string
  ): Promise<ReadGetAllWishlistItems> {
    const { skip, limit } = pagination;
    try {
      const [allWishlistItems, totalWishlistItems] =
        await this.wishlistRepository
          .createQueryBuilder("wishlist")
          .leftJoinAndSelect("wishlist.product", "product")
          .where("wishlist.userId = :userId", { userId })
          .skip(skip)
          .take(limit)
          .getManyAndCount();

      const wishlistItemsDto: ReadGetWishlistItemDto[] = allWishlistItems.map(
        (wishlistItem) => ({
          productName: wishlistItem.product.productName,
          price: wishlistItem.product.price,
          description: wishlistItem.product.description,
          addedAt: wishlistItem.createdAt,
        })
      );

      const totalPages = Math.ceil(totalWishlistItems / limit);

      return { wishlistDto: wishlistItemsDto, totalPages, totalWishlistItems };
    } catch (error) {
      console.error("Error during retrieve wishlist items:", error);
      return { error: "Internal server error" };
    }
  }
}
