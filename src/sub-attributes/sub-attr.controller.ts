import { Response } from "express";
import { SubAttributeService } from "./sub-attr.service";
import { CustomRequest } from "../middlewares/authentication";

export class SubAttributeController {
  constructor(private subAttrService: SubAttributeService) {}

  async createSubttr(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const attrId = req.params.attrId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.subAttrService.createSubAttr(
      userId,
      attrId,
      data
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);
  }

  async getSubAttrs(req: CustomRequest, res: Response): Promise<Response> {
    const attrId = req.params.attrId;
    const result = await this.subAttrService.getSubAttrs(attrId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async deleteSubAttr(req: CustomRequest, res: Response): Promise<Response> {
    const subAttrId = req.params.subAttrId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.subAttrService.deleteSubAttr(userId, subAttrId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  }

  async assignSubAttrsToProduct(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const subAttrIds = req.body;
    const productId = req.params.productId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.subAttrService.assignSubAttrsToProduct(
      userId,
      productId,
      subAttrIds
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getProductSubAttrs(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const productId = req.params.productId;
    const result = await this.subAttrService.getProductSubAttrs(productId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }

  async deleteProductSubAttr(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const productId = req.params.productId;
    const subAttrId = req.params.subAttrId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.subAttrService.deleteProductSubAttr(
      userId,
      subAttrId,
      productId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }
}
