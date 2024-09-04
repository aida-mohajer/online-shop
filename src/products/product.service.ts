import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";
import { Feedback } from "../entities/feedback.entity";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { Pagination } from "../middlewares/pagination";
import { ProductDto } from "./dto/product.dto";
import { ReadGetProductDto } from "./dto/read-get-product.dto";
import { ReadGetAllProductsDto } from "./dto/read-getAll-products.dto";
import { ReadProductDto } from "./dto/read-product.dto";
import { ReadUpdateProductDto } from "./dto/read-update-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

export class ProductService {
  constructor(
    private productRepository = AppDataSource.getRepository(Product),
    private userRepository = AppDataSource.getRepository(User),
    private categoryRepository = AppDataSource.getRepository(Category),
    private feedbackRepository = AppDataSource.getRepository(Feedback),
    private orderRepository = AppDataSource.getRepository(Order)
  ) {}
  async addProduct(
    data: ProductDto,
    userId: string,
    categoryId: string
  ): Promise<ReadProductDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        return { error: "Category not found" };
      }

      const product = this.productRepository.create({
        categoryId: category.id,
        userId: user?.id,
        productName: data.productName,
        price: data.price,
        description: data.description,
      });

      await this.productRepository.save(product);

      return {
        productName: product.productName,
        price: product.price,
        description: product.description,
        createdAt: product.createdAt,
      };
    } catch (error) {
      console.error("Error during adding product:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getProduct(productId: string): Promise<ReadGetProductDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!product) {
        return { error: "Product not found" };
      }
      const dto = new ReadGetProductDto();
      dto.productName = product.productName;
      dto.price = product.price;
      dto.description = product.description;

      if (product.createdBy) {
        dto.createdby = { username: product.createdBy.username };
      }
      return dto;
    } catch (error) {
      console.error("Error during retrieve product:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getAllProducts(pagination: Pagination): Promise<ReadGetAllProductsDto> {
    const { skip, limit } = pagination;
    try {
      const [allProducts, totalProducts] = await this.productRepository
        .createQueryBuilder("product")
        .select(["product.productName", "product.price", "product.description"])
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      const productDto: ReadGetProductDto[] = allProducts.map((product) => ({
        productName: product.productName,
        price: product.price,
        description: product.description,
      }));

      const totalPages = Math.ceil(totalProducts / limit);

      return { productDto, totalPages, totalProducts };
    } catch (error) {
      console.error("Error during retrieve products:", error);
      return { error: "Internal server error" };
    }
  }

  async updateProduct(
    userId: string,
    productId: string,
    data: UpdateProductDto
  ): Promise<ReadUpdateProductDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!product) {
        return { error: "Product not found" };
      }

      // if (product.userId !== userId) {
      //   return { error: "You are not authorized to update this product" };
      // }

      Object.assign(product, data);

      await this.productRepository.save(product);

      const dto = new ReadUpdateProductDto();
      dto.product = {
        productName: product.productName,
        price: product.price,
        description: product.description,
        updatedAt: product.updatedAt,
      };
      return dto;
    } catch (error) {
      console.error("Error during updating user:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async deleteProduct(
    productId: string
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();
    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const product = await this.productRepository.findOne({
            where: { id: productId },
          });

          if (!product) {
            return { error: "Product not found" };
          }

          const orders = await transactionalEntityManager.find(Order, {
            where: { productId: productId },
          });

          if (orders.length > 0) {
            await transactionalEntityManager.update(
              Order,
              { productId: productId },
              { productId: null }
            );
          }

          await transactionalEntityManager.delete(Product, { id: productId });

          return {
            message: "Product deleted successfully",
          };
        } catch (error) {
          console.error("Error during deleting product:", error);
          return { error: " An unexpected error occured" };
        }
      }
    );
  }
}
