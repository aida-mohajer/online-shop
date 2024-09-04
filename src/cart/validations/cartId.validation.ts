import { Request, Response, NextFunction } from "express";

export const validateCartId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartId = req.params.cartId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(cartId)) {
    return res.status(400).json({
      error: "Invalid cartId format. Please provide a valid UUID.",
    });
  }

  next();
};
