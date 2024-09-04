import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(4, 10)
  @IsString()
  username?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @Length(5, 8)
  @IsString()
  password?: string;
  @IsOptional()
  @IsInt()
  @Min(7)
  @Max(99)
  age?: number;
}
