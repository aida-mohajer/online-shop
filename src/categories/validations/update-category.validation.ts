import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { UpdateCategoryDto } from "../dto/update-category.dto";

export const validateUpdateCategoryDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateCategoryDto = Object.assign(new UpdateCategoryDto(), req.body);
  const errors = await validate(updateCategoryDto);

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
