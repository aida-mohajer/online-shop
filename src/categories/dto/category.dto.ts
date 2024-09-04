import { IsString, Length } from "class-validator";

export class CategoryDto {
  @IsString()
  @Length(4, 10)
  categoryName!: string;
}
