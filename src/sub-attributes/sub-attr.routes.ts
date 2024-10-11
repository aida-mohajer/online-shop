import express from "express";
import { Request, Response } from "express";
import { authentication, CustomRequest } from "../middlewares/authentication";
import { SubAttributeService } from "./sub-attr.service";
import { SubAttributeController } from "./sub-attr.controller";
import { validateSubAttrsDto } from "./validations/subAttrs.validation";
import { validateAttributeId } from "../attributes/validations/attributeId.validation";
import { validateSubAttrId } from "./validations/subAttrId.validation";
import { validateProductId } from "../products/validations/productId.validation";
import { validateSubAttrIdsDto } from "./validations/subattrIds.validation";

export const subAttrRouter = express.Router();
const subAttrService = new SubAttributeService();
const subAttrController = new SubAttributeController(subAttrService);

subAttrRouter.post(
  "/:attrId",
  authentication,
  validateAttributeId,
  validateSubAttrsDto,
  async (req: CustomRequest, res: Response) => {
    return await subAttrController.createSubttr(req, res);
  }
);

subAttrRouter.get(
  "/:attrId",
  validateAttributeId,
  async (req: CustomRequest, res: Response) => {
    return await subAttrController.getSubAttrs(req, res);
  }
);

subAttrRouter.delete(
  "/:subAttrId",
  authentication,
  validateSubAttrId,
  async (req: Request, res: Response) => {
    return await subAttrController.deleteSubAttr(req, res);
  }
);

subAttrRouter.post(
  "/product/:productId",
  authentication,
  validateProductId,
  validateSubAttrIdsDto,
  async (req: Request, res: Response) => {
    return await subAttrController.assignSubAttrsToProduct(req, res);
  }
);

subAttrRouter.get(
  "/product/:productId",
  validateProductId,
  async (req: Request, res: Response) => {
    return await subAttrController.getProductSubAttrs(req, res);
  }
);

subAttrRouter.delete(
  "/:productId/attr/:subAttrId",
  authentication,
  validateProductId,
  validateSubAttrId,
  async (req: Request, res: Response) => {
    return await subAttrController.deleteProductSubAttr(req, res);
  }
);
