export class ReadGetCategoryDto {
  id?: string;
  categoryName?: string;
  subCategories?: {
    id: string;
    categoryName: string;
  }[];
  error?: string;
}
