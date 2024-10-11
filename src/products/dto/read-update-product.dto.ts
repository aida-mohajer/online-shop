export class ReadUpdateProductDto {
  response?: {
    productName: string;
    price: number;
    description: string;
    attributes?: {
      id: string;
      name?: string;
      value?: string;
    }[];
  };
  error?: string;
  message?: string;
}
