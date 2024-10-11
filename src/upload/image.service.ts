import { AppDataSource } from "../data-source";
import { ProductImages } from "../entities/product-images.entity";
import { User } from "../entities/user.entity";

export class UploadImageService {
  constructor(
    private imageRepository = AppDataSource.getRepository(ProductImages),
    private userRepository = AppDataSource.getRepository(User)
  ) {}
  async findCoverByFileName(
    fileName: string,
    userId: string
  ): Promise<void | { error?: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }
    const image = await this.imageRepository.findOne({
      where: { imageName: fileName },
    });
    if (image) {
      return { error: "this image is in use by product" };
    }
  }
}
