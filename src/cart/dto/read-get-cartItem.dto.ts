export class ReadGetCartItemDto {
  product?: {
    productName?: string;
    price?: number;
    description?: string;
    addedAt?: Date;
    quantity?: number;
  };
  totalPrice?: number;
  message?: string;
  error?: string;
}
