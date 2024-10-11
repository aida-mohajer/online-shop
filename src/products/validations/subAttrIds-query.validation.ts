import { Request, Response, NextFunction } from "express";

export const validateQuerySubAttrIds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subAttrIds = req.query.subAttrIds;
  if (subAttrIds) {
    if (!subAttrIds || typeof subAttrIds !== "string") {
      return res.status(400).json({
        error:
          "Invalid input. Please provide a comma-separated list of UUIDs in the 'ids' query parameter.",
      });
    }

    const idsArray = subAttrIds.split(",");

    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const invalidIds = idsArray.filter((id) => !uuidRegex.test(id.trim()));

    if (invalidIds.length > 0) {
      return res.status(400).json({
        error:
          "Invalid UUID format for the following ids: " + invalidIds.join(", "),
      });
    }
  }
  next();
};
