import { Request, Response, NextFunction } from "express";

export const validateWishlistId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const wishlistId = req.params.wishlistId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(wishlistId)) {
    return res.status(400).json({
      error: "Invalid wishlistId format. Please provide a valid UUID.",
    });
  }

  next();
};
