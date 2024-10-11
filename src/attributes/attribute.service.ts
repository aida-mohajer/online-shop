import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Attribute } from "../entities/attribute.entity";
import { Category } from "../entities/category.entity";
import { User } from "../entities/user.entity";
import { Search } from "../middlewares/search";
import { AttributeDto } from "./dto/attribute.dto";
import { ReadAttributeDto } from "./dto/read-attribute.dto";
import { ReadAttributesDto } from "./dto/read-attributes.dto";
import { UpdateAttributeDto } from "./dto/update-attribute.dto";
import { AssignAttrIdsDto } from "./dto/assign-attrIds.dto";
import { cache, cacheStats } from "../cache";

export class AttributeService {
  constructor(
    private attributeRepository = AppDataSource.getRepository(Attribute),
    private userRepository = AppDataSource.getRepository(User),
    private categoryRepository = AppDataSource.getRepository(Category)
  ) {}

  // Helper function to construct cache key
  private getCacheKey(categoryId: string): string {
    return `category_${categoryId}_attrs_subs`;
  }
  async createAttribute(
    userId: string,
    data: AttributeDto
  ): Promise<ReadAttributeDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { error: "User not found!" };
      }

      let attribute = await this.attributeRepository.findOne({
        where: { name: data.name },
      });

      if (!attribute) {
        attribute = this.attributeRepository.create({
          name: data.name,
        });
        await this.attributeRepository.save(attribute);
      }

      return {
        id: attribute.id,
        name: attribute.name,
      };
    } catch (error) {
      console.error("Error during creating attributes:", error);
      return { error: "An unexpected error occurred." };
    }
  }

  async getAttributes(
    userId: string,
    search?: Search
  ): Promise<ReadAttributesDto> {
    const { attributeName = "" } = search || {};
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found!" };
      }
      const queryBuilder = this.attributeRepository
        .createQueryBuilder("attribute")
        .select(["attribute.id", "attribute.name"]);

      if (attributeName) {
        queryBuilder.where("attribute.name LIKE :searchTerm", {
          searchTerm: `%${attributeName}%`,
        });
      }
      const allAttributes = await queryBuilder.getMany();
      const response = allAttributes.map((attr) => ({
        id: attr.id,
        name: attr.name,
      }));

      return {
        message: "attributes retrieved successfully",
        response,
      };
    } catch (error) {
      console.error("Error during retrieve attributes:", error);
      return { error: "Internal server error" };
    }
  }

  async updateAttribute(
    data: UpdateAttributeDto,
    userId: string,
    attrId: string
  ): Promise<{ message?: string; error?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found!" };
      }
      const attribute = await this.attributeRepository.findOne({
        where: { id: attrId },
      });
      if (!attribute) {
        return { error: "Attribute not found!" };
      }
      Object.assign(attribute, data);

      await this.attributeRepository.save(attribute);

      return { message: "Attribute updated successfully" };
    } catch (error) {
      console.error("Error during update attribute:", error);
      return { error: "Internal server error" };
    }
  }

  async deleteAttribute(
    userId: string,
    attrId: string
  ): Promise<{ error?: string; message?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found!" };
      }
      const attribute = await this.attributeRepository.findOne({
        where: { id: attrId },
      });
      if (!attribute) {
        return { error: "Attribute not found!" };
      }

      await this.attributeRepository.remove(attribute);

      return { message: "Attribute deleted successfully" };
    } catch (error) {
      console.error("Error during removing attribute", error);
      return { error: "An unexpected error occured" };
    }
  }

  async assignAttrsToCategory(
    userId: string,
    categoryId: string,
    data: AssignAttrIdsDto
  ): Promise<{ error?: string; message?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found!" };
      }

      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ["attributes"],
      });
      if (!category) {
        return { error: "Category not found" };
      }

      const newAttributes = await this.attributeRepository.findBy({
        id: In(data.attributeIds),
      });

      if (newAttributes.length !== data.attributeIds.length) {
        return { error: "One or more attributes were not found" };
      }

      const existingAttributeIds = category.attributes.map((attr) => attr.id);

      const uniqueNewAttributes = newAttributes.filter(
        (attr) => !existingAttributeIds.includes(attr.id)
      );

      category.attributes = [...category.attributes, ...uniqueNewAttributes];

      await this.categoryRepository.save(category);

      return { message: "Attributes assigned successfully!" };
    } catch (error) {
      console.error("Error during assign attributes", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async getCategoryAttrsAndSubs(
    categoryId: string
  ): Promise<ReadAttributesDto> {
    const cacheKey = this.getCacheKey(categoryId);

    // Check if cached data exists
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      cacheStats.hitCount++; // Increment hit counter
      console.log(`Cache hit for key: ${cacheKey}`);
      return cachedResult;
    }

    // If cache miss, increment miss counter
    cacheStats.missCount++;
    console.log(`Cache miss for key: ${cacheKey}`);
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: [
          "attributes",
          "attributes.subAttributes",
          "parentCategory",
          "subcategories",
          "subcategories.subcategories",
        ],
      });

      if (!category) {
        return { error: "Category not found" };
      }

      const gatherAttributes = async (cat: Category): Promise<Attribute[]> => {
        let allAttributes: Attribute[] = [...cat.attributes];

        if (cat.parentCategory) {
          const parentCategory = await this.categoryRepository.findOne({
            where: { id: cat.parentCategory.id },
            relations: [
              "attributes",
              "parentCategory",
              "attributes.subAttributes",
            ],
          });

          if (parentCategory) {
            const parentAttributes = await gatherAttributes(parentCategory);
            allAttributes = [...allAttributes, ...parentAttributes];
          }
        }
        return allAttributes;
      };

      const allAttributes: Attribute[] = await gatherAttributes(category);

      const uniqueAttributes = Array.from(
        new Map(allAttributes.map((attr) => [attr.id, attr])).values()
      );

      const response = {
        response: uniqueAttributes.map((attr: Attribute) => ({
          id: attr.id,
          name: attr.name,
          subAttrs: attr.subAttributes.map((subAttr) => ({
            id: subAttr.id,
            value: subAttr.value,
          })),
        })),
      };

      cache.set(cacheKey, response);
      console.log("Setting new cache data");
      return response;
    } catch (error) {
      console.error("Error during getting category attributes", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async deleteCategoryAttr(
    userId: string,
    attrId: string,
    categoryId: string
  ): Promise<{ error?: string; message?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found!" };
      }

      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ["attributes"],
      });
      if (!category) {
        return { error: "Category not found!" };
      }
      const attributeToRemove = category.attributes.find(
        (attr) => attr.id === attrId
      );
      if (!attributeToRemove) {
        return { error: "Attribute not associated with this category!" };
      }

      category.attributes = category.attributes.filter(
        (attr) => attr.id !== attrId
      );

      await this.categoryRepository.save(category);

      return { message: "Attribute deleted successfully from category" };
    } catch (error) {
      console.error("Error during removing attribute from category", error);
      return { error: "An unexpected error occured" };
    }
  }
}
