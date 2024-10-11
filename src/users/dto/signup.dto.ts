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
  @Length(4, 20)
  @IsString()
  username!: string;
  @IsEmail()
  email!: string;
  @Length(5, 15)
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
