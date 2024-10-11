export class ReadCategoryProductsDto {
  response?: {
    id: string;
    productName: string;
    price: number;
    rating: number;
    description: string;
    coverImage: { id: string } | null;
  }[];
  viewCount?: number;
  error?: string;
}
