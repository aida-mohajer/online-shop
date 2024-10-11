import { Request, Response, NextFunction } from "express";

export const validateSubAttrId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subAttrId = req.params.subAttrId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(subAttrId)) {
    return res.status(400).json({
      error: "Invalid sub attribute Id format. Please provide a valid UUID.",
    });
  }

  next();
};
