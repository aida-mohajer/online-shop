import { Pagination } from "../../middlewares/pagination";

export class GetFeedbackDto {
  productId!: string;
  pagination!: Pagination;
}
