import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { UpdateProductDto } from "../dto/update-product.dto";

export const validateUpdateProductDto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateProductDto = Object.assign(new UpdateProductDto(), req.body);

  const productErrors = await validate(updateProductDto);

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
  //   updateProductDto.attributes.map(async (attr: string) => {
  //     const attrDto = Object.assign(new UpdateProductDto(), attr);
  //     return validate(attrDto);
  //   })
  // );

  // // Flatten the array of attribute errors
  // const flattenedAttrErrors = attributeErrors.flat();

  // // If there are validation errors in attribute fields
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
