import { Feedback } from "../../entities/feedback.entity";

export class ReadGetAllFeedbackDto {
  response?: Feedback[];
  totalPages?: number;
  totalFeedback?: number;
  message?: string;
  error?: string;
}
