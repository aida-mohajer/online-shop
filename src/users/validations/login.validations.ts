import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { LoginDto } from "../dto/login.dto";

export const validateLoginDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginDto = Object.assign(new LoginDto(), req.body);
  const errors = await validate(loginDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  const allowedProperties = ["username", "password"];
  const requestKeys = Object.keys(req.body);

  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error: "Only username & password are allowed in the request body.",
    });
  }

  next();
};
