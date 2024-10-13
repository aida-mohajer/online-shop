import { EntityManager, In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";
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
import { Search } from "../middlewares/search";
import { ReadCategoryProductsDto } from "./dto/read-category-products.dto";
import { SubAttributes } from "../entities/subattribues.entity";
import { ReadFilterProductsdto } from "./dto/read-filter-products.dto";
import { ProductVersion } from "../entities/product-version.entity";
import { ReadGetProductVersionDto } from "./dto/read-get-productVersion.dto";

export class ProductService {
  constructor(
    private productRepository = AppDataSource.getRepository(Product),
    private categoryRepository = AppDataSource.getRepository(Category),
    private userRepository = AppDataSource.getRepository(User),
    private subAttrsRepository = AppDataSource.getRepository(SubAttributes),
    private productVersionRepository = AppDataSource.getRepository(
      ProductVersion
    )
  ) {}
  async addProduct(
    userId: string,
    productData: ProductDto,
    categoryId: string
  ): Promise<ReadProductDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found" };
      }
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        return { error: "Category not found" };
      }

      const product = this.productRepository.create({
        categoryId: category.id,
        productName: productData.productName,
        price: productData.price,
        description: productData.description,
        rating: 0,
      });

      await this.productRepository.save(product);

      return { message: "product created successfully" };
    } catch (error) {
      console.error("Error during adding product:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getProduct(productId: string): Promise<ReadGetProductDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ["images", "subAttributes"],
      });

      if (!product) {
        return { error: "Product not found" };
      }

      const dto = new ReadGetProductDto();
      (dto.id = product.id), (dto.categoryId = product.categoryId);
      dto.productName = product.productName;
      dto.price = product.price;
      dto.description = product.description;
      dto.rating = product.rating;
      dto.images = product.images.map((image) => ({
        id: image.id,
        imageName: image.imageName,
        imageType: image.imageType,
      }));

      dto.features = product.subAttributes.map((attr) => ({
        id: attr.id,
        values: attr.value,
      }));

      return dto;
    } catch (error) {
      console.error("Error during retrieve product:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getCategoryProducts(
    categoryId: string
  ): Promise<ReadCategoryProductsDto> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: [
          "products",
          "subcategories",
          "subcategories.products",
          "subcategories.subcategories",
          "subcategories.subcategories.products",
        ],
      });

      if (!category) {
        return { error: "Category not found" };
      }

      // Collect all products from the current category and its subcategories
      const products: Product[] = [];

      // Helper function to recursively collect products
      const collectProducts = (cat: Category) => {
        // Add products from the current category
        if (cat.products && cat.products.length > 0) {
          products.push(...cat.products);
        }

        // Recursively collect products from subcategories
        if (cat.subcategories && cat.subcategories.length > 0) {
          cat.subcategories.forEach(collectProducts);
        }
      };

      // Start collecting products from the found category
      collectProducts(category);

      const response = products.map((product) => {
        const coverImage = product.images?.find(
          (image) => image.imageType === "cover"
        );

        return {
          id: product.id,
          productName: product.productName,
          price: product.price,
          rating: product.rating,
          description: product.description,
          coverImage: coverImage ? { id: coverImage.id } : null,
        };
      });

      return { response: response, viewCount: category.viewCount };
    } catch (error) {
      console.error("Error during retrieve category products", error);
      return { error: "Internal server error" };
    }
  }

  async getAllProducts(
    pagination: Pagination,
    search?: Search
  ): Promise<ReadGetAllProductsDto> {
    const { skip, limit } = pagination;
    const { productName = "" } = search || {};

    try {
      const queryBuilder = this.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.images", "images")
        .select([
          "product.id",
          "product.categoryId",
          "product.productName",
          "product.price",
          "product.description",
          "product.rating",
          "images.id",
          "images.imageName",
          "images.imageType",
        ])
        .orderBy("product.rating", "DESC");

      if (productName) {
        queryBuilder.where("product.productName LIKE :searchTerm", {
          searchTerm: `%${productName}%`,
        });
      }
      const totalProducts = await queryBuilder.getCount();
      queryBuilder.skip(skip).take(limit);
      const allProducts = await queryBuilder.getMany();
      const totalPages = Math.ceil(totalProducts / limit);

      const response = allProducts.map((product) => {
        const coverImage = product.images?.find(
          (image) => image.imageType === "cover"
        );
        return {
          id: product.id,
          categoryId: product.categoryId,
          productName: product.productName,
          price: product.price,
          description: product.description,
          rating: product.rating,
          imageCover: coverImage
            ? {
                id: coverImage.id,
                imageName: coverImage.imageName,
                imageType: coverImage.imageType,
              }
            : null,
        };
      });

      return {
        message:
          totalProducts > 0
            ? "Products retrieved successfully"
            : "No products found matching the search criteria.",
        response,
        totalPages,
        totalProducts,
      };
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
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { error: "User not found" };
      }

      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ["versions"],
      });
      if (!product) {
        return { error: "Product not found" };
      }

      const latestVersionNumber =
        product.versions.length > 0
          ? Math.max(...product.versions.map((v) => v.versionNumber))
          : 0;

      Object.assign(product, data);
      await this.productRepository.save(product);

      const productVersion = this.productVersionRepository.create({
        productId: product.id,
        versionNumber: latestVersionNumber + 1,
        productName: product.productName,
        price: product.price,
        description: product.description,
      });

      await this.productVersionRepository.save(productVersion);

      return {
        message: "Product updated successfully",
        response: {
          productName: product.productName,
          price: product.price,
          description: product.description,
        },
      };
    } catch (error) {
      console.error("Error during updating product:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async getProductVersions(
    userId: string,
    productId: string
  ): Promise<ReadGetProductVersionDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { error: "User not found" };
      }

      const productVersions = await this.productVersionRepository.find({
        where: { product: { id: productId } },
        relations: ["product"],
        order: { versionNumber: "ASC" },
      });

      if (!productVersions || productVersions.length === 0) {
        return { error: "No versions found for the product" };
      }

      const versionsData = productVersions.map((version) => ({
        id: version.id,
        versionNumber: version.versionNumber,
        productName: version.productName,
        price: version.price,
        description: version.description,
        createdAt: version.createdAt,
      }));

      return {
        message: "Product versions retrieved successfully",
        versions: versionsData,
      };
    } catch (error) {
      console.error("Error during retrieve product version:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async setProductVersion(
    userId: string,
    productId: string,
    versionId: string
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

      const productVersion = await this.productVersionRepository.findOne({
        where: { id: versionId },
      });
      if (!productVersion) {
        return { error: "Product version not found" };
      }

      product.productName = productVersion.productName;
      product.price = productVersion.price;
      product.description = productVersion.description;

      await this.productRepository.save(product);

      return {
        message: "Product replaced successfully",
      };
    } catch (error) {
      console.error("Error during set product version:", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async deleteProduct(
    userId: string,
    productId: string
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();
    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const user = await this.userRepository.findOne({
            where: { id: userId },
          });
          if (!user) {
            return { error: "User not found" };
          }
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

  async filterProducts(
    categoryId: string,
    pagination: Pagination,
    sortBy: string,
    search?: Search,
    subAttrIds?: string[]
  ): Promise<ReadFilterProductsdto> {
    const { skip, limit } = pagination;
    const { productName = "" } = search || {};

    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: [
          "products",
          "subcategories",
          "subcategories.products",
          "subcategories.subcategories",
          "subcategories.subcategories.products",
        ],
      });

      if (!category) {
        return { error: "Category not found" };
      }

      const products: Product[] = [];

      const collectProducts = (cat: Category) => {
        if (cat.products && cat.products.length > 0) {
          products.push(...cat.products);
        }

        if (cat.subcategories && cat.subcategories.length > 0) {
          cat.subcategories.forEach(collectProducts);
        }
      };

      collectProducts(category);

      // Filter by subAttrIds if provided
      let filteredProducts = products;

      if (subAttrIds && subAttrIds.length > 0) {
        const subAttrs = await this.subAttrsRepository.findBy({
          id: In(subAttrIds),
        });

        if (subAttrs.length !== subAttrIds.length) {
          return { error: "One or more sub attributes were not found." };
        }

        filteredProducts = await this.productRepository
          .createQueryBuilder("product")
          .innerJoin("product.subAttributes", "subAttributes")
          .select([
            "product.id",
            "product.productName",
            "product.price",
            "product.rating",
          ])
          .where("subAttributes.id IN (:...subAttrIds)", { subAttrIds })
          .groupBy(
            "product.id, product.productName, product.price, product.rating"
          )
          .having("COUNT(DISTINCT subAttributes.id) = :count", {
            count: subAttrIds.length,
          })
          .getMany();
      }

      if (productName) {
        filteredProducts = filteredProducts.filter((product) =>
          product.productName.toLowerCase().includes(productName.toLowerCase())
        );
      }

      const totalProducts = filteredProducts.length;

      if (sortBy) {
        const sortOptions: {
          [key: string]: (a: Product, b: Product) => number;
        } = {
          cheapest: (a, b) => a.price - b.price,
          mostExpensive: (a, b) => b.price - a.price,
          newest: (a, b) => (a.createdAt > b.createdAt ? -1 : 1),
        };

        if (sortBy && sortOptions[sortBy]) {
          filteredProducts.sort(sortOptions[sortBy]);
        }
      }
      const paginatedProducts = filteredProducts.slice(skip, skip + limit);

      const totalPages = Math.ceil(totalProducts / limit);

      const response = paginatedProducts.map((product) => {
        const coverImage = product.images?.find(
          (image) => image.imageType === "cover"
        );

        return {
          id: product.id,
          productName: product.productName,
          price: product.price,
          rating: product.rating,
          description: product.description,
          coverImage: coverImage ? { id: coverImage.id } : null,
        };
      });

      return {
        message:
          filteredProducts.length > 0
            ? "Products retrieved successfully"
            : "No products found matching the search criteria.",
        response,
        totalPages,
        totalProducts,
      };
    } catch (error) {
      console.error("Error during filtering products:", error);
      return { error: "An unexpected error occurred." };
    }
  }
}
// async filterProductsBySubAttributes(
//   subAttrIds: string[]
// ): Promise<ReadFilterProductsdto> {
//   try {
//     if (!subAttrIds) {
//       return { error: "No sub-attribute IDs provided." };
//     }

//     const subAttrs = await this.subAttrsRepository.findBy({
//       id: In(subAttrIds),
//     });

//     if (subAttrs.length !== subAttrIds.length) {
//       return { error: "One or more sub attributes were not found" };
//     }

//     const products = await this.productRepository
//       .createQueryBuilder("product")
//       .innerJoin("product.subAttributes", "subAttributes")
//       .select([
//         "product.id",
//         "product.productName",
//         "product.price",
//         "product.rating",
//       ])
//       .where("subAttributes.id IN (:...subAttrIds)", { subAttrIds })
//       .groupBy(
//         "product.id, product.productName, product.price, product.rating"
//       )
//       .having("COUNT(DISTINCT subAttributes.id) = :count", {
//         count: subAttrIds.length,
//       })
//       .getMany();
//     if (!products.length) {
//       return { error: "No products found for the selected sub-attributes." };
//     }

//     // Format the response to match the required DTO
//     const response = products.map((product) => {
//       const coverImage = product.images?.find(
//         (image) => image.imageType === "cover"
//       );

//       return {
//         id: product.id,
//         productName: product.productName,
//         price: product.price,
//         rating: product.rating,
//         description: product.description,
//         coverImage: coverImage ? { id: coverImage.id } : null,
//       };
//     });

//     return { response };
//   } catch (error) {
//     console.error("Error during filtering products:", error);
//     return { error: "An unexpected error occurred." };
//   }
// }
