import { AppDataSource } from "../data-source";
import { ProductImages } from "../entities/product-images.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { CreateImageDto } from "./dto/create-image.dto";
import { ReadImageDto } from "./dto/read-image.dto";
import { ReadImagesDto } from "./dto/read-images.dto";
import { UpdateImageDto } from "./dto/update-image.dto";

export class ProductImageService {
  constructor(
    private productRepository = AppDataSource.getRepository(Product),
    private imageRepository = AppDataSource.getRepository(ProductImages),
    private userRepository = AppDataSource.getRepository(User)
  ) {}

  async createProductImage(
    userId: string,
    productId: string,
    data: CreateImageDto
  ): Promise<ReadImageDto> {
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

      if (data.imageType === "cover") {
        const existingCover = await this.imageRepository.findOne({
          where: {
            product: { id: productId },
            imageType: "cover",
          },
        });

        if (existingCover) {
          return { error: "A cover image already exists for this product!" };
        }
      }

      const productImage = this.imageRepository.create({
        productId: productId,
        imageName: data.imageName,
        imageType: data.imageType,
      });
      await this.imageRepository.save(productImage);

      return {
        id: productImage.id,
        imageName: productImage.imageName,
        imageType: productImage.imageType,
        productId: productId,
      };
    } catch (error) {
      console.error("Error saving cover image:", error);
      return { error: "Error saving cover image" };
    }
  }

  async getProductImages(productId: string): Promise<ReadImagesDto> {
    try {
      const images = await this.imageRepository.find({
        where: { productId: productId },
      });

      if (!images) {
        return { error: "This product has not any image" };
      }

      const response = images.map((image) => ({
        id: image.id,
        imageName: image.imageName,
        imageType: image.imageType,
      }));

      return {
        images: response,
        message: "Images retrieved successfully",
      };
    } catch (error) {
      console.error("Error retrieve images:", error);
      return { error: "Error retrieve images" };
    }
  }

  async updateProductImage(
    userId: string,
    imageId: string,
    data: UpdateImageDto
  ): Promise<ReadImageDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { error: "User not found" };
      }
      const image = await this.imageRepository.findOne({
        where: { id: imageId },
      });
      if (!image) {
        return { error: "Image not found" };
      }

      Object.assign(image, data);
      await this.imageRepository.save(image);
      return {
        imageName: image.imageName,
        imageType: image.imageType,
      };
    } catch (error) {
      console.error("Error updating image product:", error);
      return { error: "Error updating image product" };
    }
  }
  async deleteProductImage(
    userId: string,
    imageId: string
  ): Promise<{ message?: string; error?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found" };
      }
      const image = await this.imageRepository.findOne({
        where: { id: imageId },
      });
      if (!image) {
        return { error: "Image not found" };
      }

      await this.imageRepository.remove(image);

      return { message: "Image deleted successfully" };
    } catch (error) {
      console.error("Error delete image product:", error);
      return { error: "Error during delete image product" };
    }
  }
}
