import { Request, Response, NextFunction } from "express";

export const validateAttributeId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const attrId = req.params.attrId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(attrId)) {
    return res.status(400).json({
      error: "Invalid attrId format. Please provide a valid UUID.",
    });
  }

  next();
};
