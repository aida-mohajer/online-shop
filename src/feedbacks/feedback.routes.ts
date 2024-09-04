import express from "express";
import { Response } from "express";
import { FeedbackService } from "./feedback.service";
import { FeebackController } from "./feedback.controller";
import { authentication, CustomRequest } from "../middlewares/authentication";
import { validateProductId } from "../products/validations/productId.validation";
import { validateFeedbackDto } from "./validations/feedback.validation";
import { validateFeedbackId } from "./validations/feedbackId.validation";
import { pagination } from "../middlewares/pagination";

export const feedbackRouter = express.Router();
const feedbackService = new FeedbackService();
const feedbackController = new FeebackController(feedbackService);

feedbackRouter.post(
  "/feedback/:productId",
  authentication,
  validateProductId,
  validateFeedbackDto,
  async (req: CustomRequest, res: Response) => {
    return await feedbackController.createFeedback(req, res);
  }
);

feedbackRouter.get(
  "/feedbacks/:productId",
  validateProductId,
  pagination,
  async (req: CustomRequest, res: Response) => {
    return await feedbackController.getFeedbacks(req, res);
  }
);

feedbackRouter.put(
  "/feedback/:feedbackId",
  authentication,
  validateFeedbackId,
  validateFeedbackDto,
  async (req: CustomRequest, res: Response) => {
    return await feedbackController.updateFeedback(req, res);
  }
);

feedbackRouter.delete(
  "/feedback/:feedbackId",
  authentication,
  validateFeedbackId,
  async (req: CustomRequest, res: Response) => {
    return await feedbackController.deleteFeedback(req, res);
  }
);
