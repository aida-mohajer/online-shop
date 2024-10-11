import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { UpdateImageDto } from "../dto/update-image.dto";

export const validateUpdateImageDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateImageDto = Object.assign(new UpdateImageDto(), req.body);
  const errors = await validate(updateImageDto);

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
