import { Request, Response, NextFunction } from "express";

export const validateOrderId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.orderId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(orderId)) {
    return res.status(400).json({
      error: "Invalid orderId format. Please provide a valid UUID.",
    });
  }

  next();
};
