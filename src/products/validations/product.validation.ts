import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { ProductDto } from "../dto/product.dto";

export const validateProductDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productDto = Object.assign(new ProductDto(), req.body);

  const productErrors = await validate(productDto);

  if (productErrors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: productErrors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      })),
    });
  }

  // Validate each attribute in the attributes array
  // const attributeErrors = await Promise.all(
  //   productDto.attributes.map(async (attr: string) => {
  //     const attrDto = Object.assign(new ProductAttrDto(), attr);
  //     return validate(attrDto);
  //   })
  // );

  // Flatten the array of attribute errors
  // const flattenedAttrErrors = attributeErrors.flat();

  // If there are validation errors in attribute fields
  // if (flattenedAttrErrors.length > 0) {
  //   return res.status(400).json({
  //     error: "Validation failed for attributes",
  //     details: flattenedAttrErrors.map((err) => ({
  //       property: `attributes[${err.property}]`,
  //       constraints: err.constraints,
  //     })),
  //   });
  // }

  next();
};
