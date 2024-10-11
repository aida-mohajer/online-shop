import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { SubAttrsDto } from "../dto/subAttrs.dto";

export const validateSubAttrsDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subAttrDto = Object.assign(new SubAttrsDto(), req.body);

  const productErrors = await validate(subAttrDto);

  if (productErrors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: productErrors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }
  next();
};
