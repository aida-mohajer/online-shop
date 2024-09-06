import { Min, IsInt } from "class-validator";

export class QueryParamsDto {
  @IsInt()
  @Min(1)
  page!: number;

  @IsInt()
  @Min(1)
  limit!: number;
}
