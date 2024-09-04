export class ReadGetProductDto {
  productName?: string;
  price?: number;
  description?: string;
  createdby?: {
    username: string;
  };
  error?: string;
}
