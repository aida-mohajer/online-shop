export class ReadGetAllCategories {
  response?: {
    id: string;
    categoryName: string;
    parentCategoryId: string | null;
  }[];

  totalCategories?: number;
  message?: string;
  error?: string;
}
