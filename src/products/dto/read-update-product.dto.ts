export class ReadUpdateProductDto {
  product?: {
    productName?: string;
    price?: number;
    description?: string;
    updatedAt: Date;
  };
  error?: string;
}
