import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { SignupDto } from "../dto/signup.dto";

export const validateSignupDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signupDto = Object.assign(new SignupDto(), req.body);
  const errors = await validate(signupDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  const allowedProperties = ["username", "email", "password", "age", "role"];
  const requestKeys = Object.keys(req.body);

  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error:
        "Only username,email,password,age and role are allowed in the request body.",
    });
  }

  next();
};
