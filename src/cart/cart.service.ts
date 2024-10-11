import { AppDataSource } from "../data-source";
import { CartItem } from "../entities/cartItem.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { CartItemDto } from "./dto/cartItem.dto";
import { ReadGetCartItemDto } from "./dto/read-get-cartItem.dto";
import { ReadGetAllCartItems } from "./dto/read-getAll-cartItems.dto";

export class CartService {
  constructor(
    private productRepository = AppDataSource.getRepository(Product),
    private userRepository = AppDataSource.getRepository(User),
    private cartItemRepository = AppDataSource.getRepository(CartItem)
  ) {}
  async addCartItem(
    productId: string,
    userId: string,
    data: CartItemDto
  ): Promise<{ error?: string; message?: string }> {
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

      const existingcartItem = await this.cartItemRepository.findOne({
        where: { productId: productId, userId: userId },
      });

      if (existingcartItem) {
        return { error: "Product added to cart before" };
      } else {
        const newCartItem = this.cartItemRepository.create({
          userId: user.id,
          productId: product.id,
          quantity: data.quantity,
        });
        await this.cartItemRepository.save(newCartItem);
        return { message: "Items added to cart successfully!" };
      }
    } catch (error) {
      console.error("Error during adding items to cart", error);
      return { error: "An unexpected error occured" };
    }
  }

  async getCartItem(
    cartId: string,
    userId: string
  ): Promise<ReadGetCartItemDto> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: cartId },
        relations: ["product"],
      });
      if (!cartItem) {
        return { error: "Cart Item not found" };
      }
      if (cartItem.userId !== userId) {
        return { error: "You are not authorized to access this cart item" };
      }

      const totalPrice = cartItem.quantity * cartItem.product.price;

      const dto = new ReadGetCartItemDto();
      dto.product = {
        productName: cartItem.product.productName,
        description: cartItem.product.description,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
        addedAt: cartItem.createdAt,
      };
      dto.totalPrice = totalPrice;
      dto.message = "Cart item retrieved successfully";
      return dto;
    } catch (error) {
      console.error("Error during retrieve a cart item", error);
      return { error: "An unexpected error occured" };
    }
  }

  async getAllCartItems(userId: string): Promise<ReadGetAllCartItems> {
    try {
      const queryBuilder = this.cartItemRepository
        .createQueryBuilder("cartItem")
        .leftJoinAndSelect("cartItem.product", "product")
        .select([
          "cartItem.id",
          "cartItem.quantity",
          "cartItem.createdAt",
          "product.productName",
          "product.price",
          "product.description",
        ])
        .where("cartItem.userId = :userId", { userId })
        .orderBy("product.price", "DESC");

      const [allCartItems, totalCartItems] =
        await queryBuilder.getManyAndCount();

      const cartItemsWithTotalPrice = allCartItems.map((cartItem) => ({
        ...cartItem,
        totalPrice: cartItem.quantity * cartItem.product.price,
      }));

      return {
        message:
          totalCartItems > 0
            ? "Cart items retrieved successfully"
            : "No cart items found matching the search criteria.",
        response: cartItemsWithTotalPrice,
        totalCartItems,
      };
    } catch (error) {
      console.error("Error during retrieve cartItems:", error);
      return { error: "Internal server error" };
    }
  }

  async updateCartItem(
    cartId: string,
    userId: string,
    data: CartItemDto
  ): Promise<{ error?: string; message?: string }> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: cartId },
      });
      if (!cartItem) {
        return { error: "Cart item not found" };
      }
      if (cartItem.userId !== userId) {
        return { error: "You are not authorized to update this cart item" };
      }
      Object.assign(cartItem, data);
      await this.cartItemRepository.save(cartItem);
      return { message: "Cart updated successfully!" };
    } catch (error) {
      console.error("Error during update category", error);
      return { error: "An unexpected error occured" };
    }
  }

  async deleteCartItem(
    userId: string,
    cartId: string
  ): Promise<{ error?: string; message?: string }> {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        where: { id: cartId },
      });
      if (!cartItem) {
        return { error: "Cart item not found" };
      }
      if (cartItem.userId !== userId) {
        return { error: "You are not authorized to delete this cart item" };
      }
      await this.cartItemRepository.remove(cartItem);
      return { message: "Cart item deleted successfully!" };
    } catch (error) {
      console.error("Error during delete cart item", error);
      return { error: "An unexpected error occured" };
    }
  }
}
