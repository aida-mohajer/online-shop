export class ReadGetProductDto {
  id?: string;
  categoryId?: string;
  productName?: string;
  price?: number;
  description?: string;
  rating?: number;
  images?: {
    id: string;
    imageName: string;
    imageType: string;
  }[];
  features?: {
    id: string;
    values: string;
  }[];
  error?: string;
}
