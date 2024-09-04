import {
  IsEmail,
  IsIn,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class SignupDto {
  @Length(4, 10)
  @IsString()
  username!: string;
  @IsEmail()
  email!: string;
  @Length(5, 8)
  @IsString()
  password!: string;
  @IsInt()
  @Min(7)
  @Max(99)
  age!: number;
  @IsString()
  @IsIn(["admin", "user"])
  role!: string;
}
