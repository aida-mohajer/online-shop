import { Response } from "express";
import { CustomRequest } from "../middlewares/authentication";
import { FeedbackDto } from "./dto/feedback.dto";
import { FeedbackService } from "./feedback.service";

export class FeebackController {
  constructor(private feedbackService: FeedbackService) {}

  async createFeedback(req: CustomRequest, res: Response): Promise<Response> {
    const data: FeedbackDto = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const productId = req.params.productId;
    const result = await this.feedbackService.createFeedback(
      data,
      userId,
      productId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getFeedbacks(req: CustomRequest, res: Response): Promise<Response> {
    const productId = req.params.productId;
    const pagination = req.pagination;
    if (!pagination) {
      return res
        .status(400)
        .json({ error: "Pagination parameters are missing" });
    }
    const result = await this.feedbackService.getFeedbacks(
      productId,
      pagination
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateFeedback(req: CustomRequest, res: Response): Promise<Response> {
    const data: FeedbackDto = req.body;
    const feedbackId = req.params.feedbackId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.feedbackService.updateFeedback(
      data,
      feedbackId,
      userId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteFeedback(req: CustomRequest, res: Response): Promise<Response> {
    const feedbackId = req.params.feedbackId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.feedbackService.deleteFeedback(
      feedbackId,
      userId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
