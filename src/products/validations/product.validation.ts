import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { ProductDto } from "../dto/product.dto";

export const validateProductDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productDto = Object.assign(new ProductDto(), req.body);
  const errors = await validate(productDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  const allowedProperties = ["productName", "price", "description"];
  const requestKeys = Object.keys(req.body);

  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error:
        "Only productName, price and description are allowed in the request body.",
    });
  }

  next();
};
