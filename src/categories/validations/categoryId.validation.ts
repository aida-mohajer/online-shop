import { Request, Response, NextFunction } from "express";

export const validateCategoryId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.categoryId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(categoryId)) {
    return res.status(400).json({
      error: "Invalid categoryId format. Please provide a valid UUID.",
    });
  }

  next();
};
