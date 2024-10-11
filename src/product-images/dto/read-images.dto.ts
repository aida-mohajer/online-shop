import { ProductImages } from "../../entities/product-images.entity";

export class ReadImagesDto {
  images?: Array<Partial<ProductImages>>;
  message?: string;
  error?: string;
}
