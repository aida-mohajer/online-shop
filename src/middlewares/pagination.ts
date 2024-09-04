import { Response, NextFunction } from "express";
import { validate } from "class-validator";
import { CustomRequest } from "./authentication";
import { QueryParamsDto } from "../products/dto/query-param.dto";

export interface Pagination {
  page: number;
  limit: number;
  skip: number;
}

export const pagination = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const pageParam = req.query.page
    ? parseInt(req.query.page as string, 10)
    : undefined;
  const limitParam = req.query.page
    ? parseInt(req.query.limit as string, 10)
    : undefined;

  const queryParams = { page: pageParam, limit: limitParam };

  // Validate query parameters using DTO
  const queryParamDto = Object.assign(new QueryParamsDto(), queryParams);
  const errors = await validate(queryParamDto);

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  // Check for unexpected properties in the query
  const allowedProperties = ["page", "limit"];
  const requestKeys = Object.keys(req.query);

  const hasUnexpectedProperties = requestKeys.some(
    (key) => !allowedProperties.includes(key)
  );

  if (hasUnexpectedProperties) {
    return res.status(400).json({
      error: "Only page and limit are allowed in the query params.",
    });
  }

  if (pageParam === undefined || limitParam === undefined) {
    return res.status(400).json({ error: "Page and limit must be provided." });
  }

  const skip = (pageParam - 1) * limitParam;

  req.pagination = { page: pageParam, limit: limitParam, skip };
  return next();
};
