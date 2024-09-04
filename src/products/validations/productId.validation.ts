import { Request, Response, NextFunction } from "express";

export const validateProductId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.productId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(productId)) {
    return res.status(400).json({
      error: "Invalid productId format. Please provide a valid UUID.",
    });
  }

  next();
};
