import { EntityManager, In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity";
import { CategoryDto } from "./dto/category.dto";
import { ReadGetAllCategories } from "./dto/read-getAll-categories.dto";
import { Order } from "../entities/order.entity";
import { Search } from "../middlewares/search";
import { User } from "../entities/user.entity";
import { ReadGetCategoryDto } from "./dto/raed-get-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryViewLog } from "../entities/category-view.entity";

export class CategoryService {
  constructor(
    private categoryRepository = AppDataSource.getRepository(Category),
    private userRepository = AppDataSource.getRepository(User),
    private catViewRepository = AppDataSource.getRepository(CategoryViewLog)
  ) {}
  async createCategory(
    userId: string,
    data: CategoryDto
  ): Promise<{ error?: string; message?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found" };
      }

      let parentCategory = null;
      if (data.parentCategoryId) {
        parentCategory = await this.categoryRepository.findOne({
          where: { id: data.parentCategoryId },
        });
        if (!parentCategory) {
          return { error: "Parent category not found" };
        }
      }
      const category = this.categoryRepository.create({
        categoryName: data.categoryName,
        parentCategory,
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
        relations: ["subcategories"],
      });

      if (!category) {
        return { error: "Category not found" };
      }

      return {
        id: category.id,
        categoryName: category.categoryName,
        subCategories: category?.subcategories.map((subcategory) => ({
          id: subcategory.id,
          categoryName: subcategory.categoryName,
        })),
      };
    } catch (error) {
      console.error("Error during retrieve a category", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async getAllCategories(search?: Search): Promise<ReadGetAllCategories> {
    const { categoryName = "" } = search || {};
    try {
      const queryBuilder = this.categoryRepository
        .createQueryBuilder("category")
        .where("category.parentCategoryId IS NULL")
        .orderBy("category.categoryName", "ASC");

      if (categoryName) {
        queryBuilder.where("category.categoryName LIKE :searchTerm", {
          searchTerm: `%${categoryName}%`,
        });
      }

      const [allCategories, totalCategories] =
        await queryBuilder.getManyAndCount();

      const response = allCategories.map((category) => ({
        id: category.id,
        categoryName: category.categoryName,
        parentCategoryId: category.parentCategoryId,
      }));

      return {
        message:
          totalCategories > 0
            ? "Categories retrieved successfully"
            : "No categories found matching the search criteria.",
        response,
        totalCategories,
      };
    } catch (error) {
      console.error("Error during retrieve categories:", error);
      return { error: "Internal server error" };
    }
  }

  async updateCategory(
    userId: string,
    data: UpdateCategoryDto,
    categoryId: string
  ): Promise<{ error?: string; message?: string }> {
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

      Object.assign(category, data);

      await this.categoryRepository.save(category);
      return { message: "Category updated successfully!" };
    } catch (error) {
      console.error("Error during update category", error);
      return { error: "An unexpected error occured" };
    }
  }

  async deleteCategory(
    userId: string,
    categoryId: string
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
  async handleCategoryView(
    categoryId: string,
    ipAddress: string,
    currentTime: number,
    cooldown: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        return { success: false, error: "Category not found" };
      }
      const recentView = await this.catViewRepository
        .createQueryBuilder()
        .where("categoryId = :categoryId", { categoryId })
        .andWhere("ipAddress = :ipAddress", { ipAddress })
        .andWhere("viewedAt > :recentTime", {
          recentTime: new Date(currentTime - cooldown),
        })
        .getOne();

      if (!recentView) {
        await this.categoryRepository.increment(
          { id: categoryId },
          "viewCount",
          1
        );

        const newView = this.catViewRepository.create({
          category,
          ipAddress,
          viewedAt: new Date(currentTime),
        });
        await this.catViewRepository.save(newView);
      }

      return { success: true };
    } catch (error) {
      console.error("Error handling category view:", error);
      return { success: false, error: "Internal server error" };
    }
  }
}
