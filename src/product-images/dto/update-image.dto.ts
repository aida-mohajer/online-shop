import { IsIn, IsOptional, Matches } from "class-validator";

export class UpdateImageDto {
  @Matches(/\.(jpg|jpeg|png|gif)$/i, {
    message:
      "Image name must have a valid image extension (.jpg, .jpeg, .png, .gif)",
  })
  @IsOptional()
  imageName?: string;

  @IsIn(["cover", "gallery"])
  @IsOptional()
  imageType?: string;
}
