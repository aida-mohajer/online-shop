import { AppDataSource } from "../data-source";
import { Attribute } from "../entities/attribute.entity";
import { SubAttributes } from "../entities/subattribues.entity";
import { User } from "../entities/user.entity";
import { SubAttrsDto } from "./dto/subAttrs.dto";
import { ReadSubAttrDto } from "./dto/read-sub-attr.dto";
import { Product } from "../entities/product.entity";
import { In } from "typeorm";
import { SubAttrIdsDto } from "./dto/subattrIds.dto";
import { cache } from "../cache";

export class SubAttributeService {
  constructor(
    private subAttrRepository = AppDataSource.getRepository(SubAttributes),
    private userRepository = AppDataSource.getRepository(User),
    private attrRepository = AppDataSource.getRepository(Attribute),
    private productRepository = AppDataSource.getRepository(Product)
  ) {}

  async createSubAttr(
    userId: string,
    attrId: string,
    data: SubAttrsDto
  ): Promise<{ message?: string; error?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found" };
      }

      const attribute = await this.attrRepository.findOne({
        where: { id: attrId },
        relations: ["categories"],
      });
      if (!attribute) {
        return { error: "Attribute not found" };
      }

      const subAttr = await this.subAttrRepository.findOne({
        where: { attributeId: attrId, value: data.value },
      });
      if (subAttr) {
        return { error: "this attribute has this value already" };
      }

      const subAttrs = this.subAttrRepository.create({
        attributeId: attrId,
        value: data.value,
      });
      await this.subAttrRepository.save(subAttrs);

      // Invalidate cache for categories using this attribute
      const categoriesUsingAttr = attribute.categories;
      categoriesUsingAttr.forEach((category) => {
        const cacheKey = `category_${category.id}_attrs_subs`;
        cache.del(cacheKey);
        console.log(`Cache invalidated for key: ${cacheKey}`);
      });
      return {
        message: "Sub attribute created successfully",
      };
    } catch (error) {
      console.error("Error during creating sub attribute:", error);
      return { error: "An unexpected error occurred." };
    }
  }

  async getSubAttrs(attrId: string): Promise<ReadSubAttrDto> {
    try {
      const attribute = await this.attrRepository.findOne({
        where: { id: attrId },
        relations: ["subAttributes"],
      });
      if (!attribute) {
        return { error: "attribute not found" };
      }

      const response = attribute.subAttributes.map((subAttr) => ({
        id: subAttr.id,
        value: subAttr.value,
      }));

      return {
        response,
      };
    } catch (error) {
      console.error("Error during retrieve sub attribute:", error);
      return { error: "An unexpected error occurred." };
    }
  }

  async deleteSubAttr(
    userId: string,
    subAttrId: string
  ): Promise<{ message?: string; error?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found" };
      }
      const subAttr = await this.subAttrRepository.findOne({
        where: { id: subAttrId },
      });
      if (!subAttr) {
        return { error: "sub attribute not found" };
      }

      const attribute = await this.attrRepository.findOne({
        where: { id: subAttr.attributeId },
        relations: ["categories"],
      });

      //foreign key to junk table dare
      await this.subAttrRepository.remove(subAttr);

      const categoriesUsingAttr = attribute?.categories || [];
      categoriesUsingAttr.forEach((category) => {
        const cacheKey = `category_${category.id}_attrs_subs`;
        cache.del(cacheKey);
        console.log(`Cache invalidated for key: ${cacheKey}`);
      });

      return { message: "sub attribute deleted successfully" };
    } catch (error) {
      console.error("Error during removing sub attribute:", error);
      return { error: "An unexpected error occurred." };
    }
  }

  async assignSubAttrsToProduct(
    userId: string,
    productId: string,
    data: SubAttrIdsDto
  ): Promise<{ error?: string; message?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found!" };
      }

      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ["subAttributes"],
      });
      if (!product) {
        return { error: "Product not found" };
      }

      const newSubAttributes = await this.subAttrRepository.findBy({
        id: In(data.subAttributeIds),
      });

      if (newSubAttributes.length !== data.subAttributeIds.length) {
        return { error: "One or more sub attributes were not found" };
      }

      const existingSubAttributeIds = product.subAttributes.map(
        (subAttr) => subAttr.id
      );

      const uniqueNewSubAttributes = newSubAttributes.filter(
        (subAttr) => !existingSubAttributeIds.includes(subAttr.id)
      );

      // Combine existing and unique new sub attributes
      product.subAttributes = [
        ...product.subAttributes,
        ...uniqueNewSubAttributes,
      ];

      await this.productRepository.save(product);

      return { message: "Sub attributes assigned successfully!" };
    } catch (error) {
      console.error("Error during assign sub attributes", error);
      return { error: "An unexpected error occurred" };
    }
  }

  async getProductSubAttrs(productId: string): Promise<ReadSubAttrDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ["subAttributes"],
      });
      if (!product) {
        return { error: "Product not found" };
      }

      return {
        response: product.subAttributes.map((subAttr) => ({
          id: subAttr.id,
          value: subAttr.value,
        })),
      };
    } catch (error) {
      console.error("Error during getting category attributes", error);
      return { error: "An unexpected error occured" };
    }
  }

  async deleteProductSubAttr(
    userId: string,
    subAttrId: string,
    productId: string
  ): Promise<{ error?: string; message?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found!" };
      }

      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ["attributes"],
      });
      if (!product) {
        return { error: "Product not found!" };
      }
      const attributeToRemove = product.subAttributes.find(
        (subAttr) => subAttr.id === subAttrId
      );
      if (!attributeToRemove) {
        return { error: "Sub attribute not associated with this product!" };
      }

      product.subAttributes = product.subAttributes.filter(
        (attr) => attr.id !== subAttrId
      );

      await this.productRepository.save(product);

      return { message: "Sub attribute deleted successfully from product" };
    } catch (error) {
      console.error("Error during removing sub attribute from product", error);
      return { error: "An unexpected error occured" };
    }
  }
}
