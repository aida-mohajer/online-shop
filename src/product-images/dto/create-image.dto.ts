import { IsIn, IsNotEmpty, Matches } from "class-validator";

export class CreateImageDto {
  @IsNotEmpty({ message: "Image name is required" })
  @Matches(/\.(jpg|jpeg|png|gif)$/i, {
    message:
      "Image name must have a valid image extension (.jpg, .jpeg, .png, .gif)",
  })
  imageName!: string;
  @IsIn(["cover", "gallery"])
  imageType!: string;
}
