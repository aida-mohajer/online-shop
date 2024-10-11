import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { AssignAttrIdsDto } from "../dto/assign-attrIds.dto";

export const validateAssignAttrIdsDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const attrIdsDto = Object.assign(new AssignAttrIdsDto(), req.body);
  const errors = await validate(attrIdsDto);

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
