import { IsString, Length } from "class-validator";

export class LoginDto {
  @Length(4, 20)
  @IsString()
  username!: string;
  @Length(5, 20)
  @IsString()
  password!: string;
}
