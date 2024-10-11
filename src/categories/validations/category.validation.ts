import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CategoryDto } from "../dto/category.dto";

export const validateCategoryDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryDto = Object.assign(new CategoryDto(), req.body);
  const errors = await validate(categoryDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  next();
};
