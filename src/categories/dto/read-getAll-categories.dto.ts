import { ReadGetCategoryDto } from "./read-get-product.dto";

export class ReadGetAllCategories {
  categoryDto?: ReadGetCategoryDto[];
  totalPages?: number;
  totalCategories?: number;
  error?: string;
}
