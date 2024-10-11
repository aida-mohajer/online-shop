import { Response, NextFunction } from "express";
import { validate } from "class-validator";
import { SearchParamsDto } from "../search-param.dto";
import { CustomRequest } from "./authentication";

export interface Search {
  categoryName: string;
  productName: string;
  attributeName: string;
}

export const search = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const categoryNameParam = req.query.categoryName as string;
  const productNameParam = req.query.productName as string;
  const attributeNameParam = req.query.attributeName as string;

  const queryParams = {
    product: productNameParam,
    category: categoryNameParam,
    attribute: attributeNameParam,
  };

  const queryParamDto = Object.assign(new SearchParamsDto(), queryParams);
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
  if (categoryNameParam !== undefined && !isNaN(Number(categoryNameParam))) {
    return res
      .status(400)
      .json({ error: "search parameter must not be a number." });
  }

  if (productNameParam !== undefined && !isNaN(Number(productNameParam))) {
    return res
      .status(400)
      .json({ error: "search parameter must not be a number." });
  }

  if (attributeNameParam !== undefined && !isNaN(Number(attributeNameParam))) {
    return res
      .status(400)
      .json({ error: "search parameter must not be a number." });
  }

  req.search = {
    categoryName: categoryNameParam,
    productName: productNameParam,
    attributeName: attributeNameParam,
  };
  return next();
};
