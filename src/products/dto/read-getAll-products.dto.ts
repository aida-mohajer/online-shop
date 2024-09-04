import { ReadGetProductDto } from "./read-get-product.dto";

export class ReadGetAllProductsDto {
  productDto?: ReadGetProductDto[];
  totalPages?: number;
  totalProducts?: number;
  error?: string;
}
