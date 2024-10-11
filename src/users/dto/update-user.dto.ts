import {
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(4, 20)
  @IsString()
  username?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @Length(5, 20)
  @IsString()
  password?: string;
  @IsOptional()
  @IsInt()
  @Min(7)
  @Max(99)
  age?: number;
  @IsOptional()
  @IsIn(["admin", "user"])
  role?: string;
}
