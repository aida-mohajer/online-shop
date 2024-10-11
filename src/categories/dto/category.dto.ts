import { IsOptional, IsString } from "class-validator";

export class CategoryDto {
  @IsString()
  categoryName!: string;

  @IsString()
  @IsOptional()
  parentCategoryId?: string | null;
}
