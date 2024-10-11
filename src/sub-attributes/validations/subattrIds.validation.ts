import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { SubAttrIdsDto } from "../dto/subattrIds.dto";

export const validateSubAttrIdsDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subattrIdsDto = Object.assign(new SubAttrIdsDto(), req.body);
  const errors = await validate(subattrIdsDto);

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
