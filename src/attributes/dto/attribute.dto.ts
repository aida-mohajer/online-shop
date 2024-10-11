import { IsString } from "class-validator";

export class AttributeDto {
  @IsString({ message: "value must be an string" })
  name!: string;
}
