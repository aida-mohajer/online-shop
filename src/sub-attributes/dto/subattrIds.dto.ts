import { ArrayNotEmpty, IsArray } from "class-validator";
import { IsCustomUUID } from "../../products/validations/uuid-validation";

export class SubAttrIdsDto {
  @IsArray({ message: "Sub attributeIds must be an array" })
  @ArrayNotEmpty({ message: "Sub attributeIds should not be empty" })
  @IsCustomUUID({ each: true })
  subAttributeIds!: string[];
}
