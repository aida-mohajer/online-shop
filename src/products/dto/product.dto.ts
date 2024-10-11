import { IsInt, IsString } from "class-validator";

export class ProductDto {
  @IsString({ message: "productName must be a string" })
  productName!: string;

  @IsInt({ message: "price must be an integer" })
  price!: number;

  @IsString({ message: "description must be a string" })
  description!: string;
}
