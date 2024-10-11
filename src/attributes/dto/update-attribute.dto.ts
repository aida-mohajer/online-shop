import { IsIn, IsOptional, IsString } from "class-validator";

export class UpdateAttributeDto {
  @IsString()
  @IsOptional()
  name?: string;
}
