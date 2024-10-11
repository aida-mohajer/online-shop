import { ArrayNotEmpty, IsArray } from "class-validator";
import { IsCustomUUID } from "../../products/validations/uuid-validation";

export class AssignAttrIdsDto {
  @IsArray({ message: "attributeIds must be an array" })
  @ArrayNotEmpty({ message: "attributeIds should not be empty" })
  @IsCustomUUID({ each: true })
  attributeIds!: string[];
}
