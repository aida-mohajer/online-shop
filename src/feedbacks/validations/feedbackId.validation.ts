import { Request, Response, NextFunction } from "express";

export const validateFeedbackId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const feedback = req.params.feedbackId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(feedback)) {
    return res.status(400).json({
      error: "Invalid feedbackId format. Please provide a valid UUID.",
    });
  }

  next();
};
