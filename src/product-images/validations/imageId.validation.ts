import { Request, Response, NextFunction } from "express";

export const validateImageId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imageId = req.params.imageId;

  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (!uuidRegex.test(imageId)) {
    return res.status(400).json({
      error: "Invalid imageId format. Please provide a valid UUID.",
    });
  }

  next();
};
