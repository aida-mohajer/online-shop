import { Request, Response } from "express";
import express from "express";
import { authentication } from "../middlewares/authentication";
import { AttributeService } from "./attribute.service";
import { AttributeController } from "./attribute.controller";
import { validateAttributeId } from "./validations/attributeId.validation";
import { validateAttributeDto } from "./validations/attribute.validation";
import { search } from "../middlewares/search";
import { UpdateValidateAttributeDto } from "./validations/update-attribute.dto";
import { validateCategoryId } from "../categories/validations/categoryId.validation";
import { validateAssignAttrIdsDto } from "./validations/assign-attrIds.validation";

export const attributeRouter = express.Router();
const attributeService = new AttributeService();
const attributeController = new AttributeController(attributeService);

attributeRouter.post(
  "/",
  authentication,
  validateAttributeDto,
  async (req: Request, res: Response) => {
    return await attributeController.createAttribute(req, res);
  }
);

attributeRouter.get(
  "",
  authentication,
  search,
  async (req: Request, res: Response) => {
    return await attributeController.getAttributes(req, res);
  }
);

attributeRouter.put(
  "/:attrId",
  authentication,
  validateAttributeId,
  UpdateValidateAttributeDto,
  async (req: Request, res: Response) => {
    return await attributeController.updateAttribute(req, res);
  }
);

attributeRouter.delete(
  "/:attrId",
  authentication,
  validateAttributeId,
  async (req: Request, res: Response) => {
    return await attributeController.deleteAttribute(req, res);
  }
);

attributeRouter.post(
  "/category/:categoryId",
  authentication,
  validateCategoryId,
  validateAssignAttrIdsDto,
  async (req: Request, res: Response) => {
    return await attributeController.assignAttrsToCategory(req, res);
  }
);

attributeRouter.get(
  "/category/:categoryId",
  validateCategoryId,
  async (req: Request, res: Response) => {
    return await attributeController.getCategoryAttrsAndSubs(req, res);
  }
);

attributeRouter.delete(
  "/category/:categoryId/attr/:attrId",
  authentication,
  validateCategoryId,
  validateAttributeId,
  async (req: Request, res: Response) => {
    return await attributeController.deleteCategoryAttr(req, res);
  }
);
