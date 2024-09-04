import { IsInt, IsNumber, IsString, Length } from "class-validator";

export class ProductDto {
  @Length(4, 10)
  @IsString()
  productName!: string;
  @IsInt()
  price!: number;
  @Length(10, 50)
  @IsString()
  description!: string;
}
