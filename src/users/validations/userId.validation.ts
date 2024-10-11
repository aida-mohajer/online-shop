import { Request, Response, NextFunction } from "express";

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(userId)) {
    return res.status(400).json({
      error: "Invalid userId format. Please provide a valid UUID.",
    });
  }

  next();
};
