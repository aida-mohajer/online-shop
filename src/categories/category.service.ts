import { EntityManager, In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity";
import { Pagination } from "../middlewares/pagination";
import { CategoryDto } from "./dto/category.dto";
import { ReadGetCategoryDto } from "./dto/read-get-product.dto";
import { ReadGetAllCategories } from "./dto/read-getAll-categories.dto";
import { Order } from "../entities/order.entity";

export class CategoryService {
  constructor(
    private categoryRepository = AppDataSource.getRepository(Category)
  ) {}
  async createCategory(
    data: CategoryDto
  ): Promise<{ error?: string; message?: string }> {
    try {
      const category = this.categoryRepository.create({
        categoryName: data.categoryName,
      });
      await this.categoryRepository.save(category);
      return { message: "Category created successfully!" };
    } catch (error) {
      console.error("Error during create category", error);
      return { error: "An unexpected error occured" };
    }
  }

  async getCategory(categoryId: string): Promise<ReadGetCategoryDto> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ["products"],
      });
      if (!category) {
        return { error: "Category not found" };
      }

      const dto = new ReadGetCategoryDto();
      (dto.categoryName = category.categoryName),
        (dto.products = category.products.map((product) => ({
          productName: product.productName,
          description: product.description,
          price: product.price,
        })));
      return dto;
    } catch (error) {
      console.error("Error during retrieve a category", error);
      return { error: "An unexpected error occured" };
    }
  }

  async getAllCategories(
    pagination: Pagination
  ): Promise<ReadGetAllCategories> {
    const { skip, limit } = pagination;
    try {
      const [allCategories, totalCategories] = await this.categoryRepository
        .createQueryBuilder("categories")
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      const categoriesDto: ReadGetCategoryDto[] = allCategories.map(
        (category) => ({
          categoryName: category.categoryName,
        })
      );

      const totalPages = Math.ceil(totalCategories / limit);

      return { categoryDto: categoriesDto, totalPages, totalCategories };
    } catch (error) {
      console.error("Error during retrieve categories:", error);
      return { error: "Internal server error" };
    }
  }

  async updateCategory(
    data: CategoryDto,
    categoryId: string
  ): Promise<{ error?: string; message?: string }> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        return { error: "Category not found" };
      }

      // category.categoryName = data.categoryName;
      Object.assign(category, data);
      await this.categoryRepository.save(category);
      return { message: "Category updated successfully!" };
    } catch (error) {
      console.error("Error during update category", error);
      return { error: "An unexpected error occured" };
    }
  }

  async deleteCategory(
    categoryId: string
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();
    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const category = await transactionalEntityManager.findOne(Category, {
            where: { id: categoryId },
          });
          if (!category) {
            return { error: "Category not found" };
          }

          const products = await transactionalEntityManager.find(Product, {
            where: { categoryId: categoryId },
          });

          if (products.length > 0) {
            const productIds = products.map((product) => product.id);
            await transactionalEntityManager.update(
              Order,
              { productId: In(productIds) },
              { productId: null }
            );
          }

          await transactionalEntityManager.delete(Product, { categoryId });
          await transactionalEntityManager.delete(Category, { id: categoryId });

          return { message: "Category deleted successfully!" };
        } catch (error) {
          console.error("Error during delete category", error);
          return { error: "An unexpected error occured" };
        }
      }
    );
  }
}
