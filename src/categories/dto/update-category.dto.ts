import { ArrayNotEmpty, IsArray, IsOptional, IsString } from "class-validator";
import { IsCustomUUID } from "../../products/validations/uuid-validation";

export class UpdateCategoryDto {
  @IsString()
  // @Length(3, 10)
  @IsOptional()
  categoryName!: string;

  @IsString()
  @IsOptional()
  parentCategoryId?: string | null;

  @IsArray({ message: "attributeIds must be an array" })
  @ArrayNotEmpty({ message: "attributeIds should not be empty" })
  @IsCustomUUID({ each: true })
  @IsOptional()
  attributeIds!: string[];
}
