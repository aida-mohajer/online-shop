import { IsInt, Max, Min } from "class-validator";

export class CartItemDto {
  @IsInt()
  @Max(10)
  @Min(1)
  quantity!: number;
}
