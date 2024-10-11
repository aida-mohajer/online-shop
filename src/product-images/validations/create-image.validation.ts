import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CreateImageDto } from "../dto/create-image.dto";

export const validateCreateImageDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imageDto = Object.assign(new CreateImageDto(), req.body);
  const errors = await validate(imageDto);

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
