import { IsString, Length } from "class-validator";

export class LoginDto {
  @Length(4, 10)
  @IsString()
  username!: string;
  @Length(5, 8)
  @IsString()
  password!: string;
}
