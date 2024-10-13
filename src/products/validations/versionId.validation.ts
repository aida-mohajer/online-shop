import { Request, Response, NextFunction } from "express";

export const validateVersionId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const versionId = req.params.versionId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(versionId)) {
    return res.status(400).json({
      error: "Invalid versionId format. Please provide a valid UUID.",
    });
  }

  next();
};
