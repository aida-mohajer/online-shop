export class ReadGetCategoryDto {
  categoryName?: string;
  products?: {
    productName: string;
    description: string;
    price?: number;
  }[];
  error?: string;
}
