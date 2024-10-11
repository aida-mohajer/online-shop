import { IsString } from "class-validator";

export class SubAttrsDto {
  @IsString()
  value!: string;
}
