import { ReadFeedbackDto } from "./read-feedback.dto";

export class ReadGetAllFeedbackDto {
  feedbackDto?: ReadFeedbackDto[];
  totalPages?: number;
  totalFeedback?: number;
  error?: string;
}
