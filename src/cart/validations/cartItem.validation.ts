import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CartItemDto } from "../dto/cartItem.dto";

export const validateCartItemDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartItemDto = Object.assign(new CartItemDto(), req.body);
  const errors = await validate(cartItemDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  const allowedProperties = ["quantity"];
  const requestKeys = Object.keys(req.body);

  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error: "Only quantity is allowed in the request body.",
    });
  }

  next();
};
