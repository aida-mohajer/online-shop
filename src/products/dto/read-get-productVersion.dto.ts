export class ReadGetProductVersionDto {
  versions?: {
    id: string;
    versionNumber: number;
    productName: string;
    price: number;
    description: string;
    createdAt: Date;
  }[];
  message?: string;
  error?: string;
}
