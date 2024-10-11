import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { AttributeDto } from "../dto/attribute.dto";
import { UpdateAttributeDto } from "../dto/update-attribute.dto";

export const UpdateValidateAttributeDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const attrDto = Object.assign(new UpdateAttributeDto(), req.body);
  const errors = await validate(attrDto);

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
