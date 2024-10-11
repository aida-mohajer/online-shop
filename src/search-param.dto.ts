import { IsOptional, IsString } from "class-validator";

export class SearchParamsDto {
  @IsString()
  @IsOptional()
  categoryName?: string;
  @IsString()
  @IsOptional()
  productName?: string;
  @IsString()
  @IsOptional()
  attributeName?: string;
}
