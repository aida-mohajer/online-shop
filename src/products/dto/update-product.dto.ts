import { IsInt, IsOptional, IsString, Length } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @Length(4, 10)
  @IsString()
  productName?: string;
  @IsOptional()
  @IsInt()
  price?: number;
  @IsOptional()
  @Length(10, 50)
  @IsString()
  description?: string;
}
