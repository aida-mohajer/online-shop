export class ReadGetAllProductsDto {
  response?: {
    id: string;
    categoryId: string;
    productName: string;
    price: number;
    description: string;
    rating: number;
    imageCover?: {
      id: string;
      imageName: string;
      imageType: string;
    } | null;
  }[];

  totalPages?: number;
  totalProducts?: number;
  message?: string;
  error?: string;
}
