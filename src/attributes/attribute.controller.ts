import { Response } from "express";
import { CustomRequest } from "../middlewares/authentication";
import { AttributeService } from "./attribute.service";

export class AttributeController {
  constructor(private attributeService: AttributeService) {}

  async createAttribute(req: CustomRequest, res: Response): Promise<Response> {
    const data = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.attributeService.createAttribute(userId, data);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getAttributes(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const search = req.search;
    if (!search) {
      return res.status(400).json({ error: "search parameter are missing" });
    }

    const result = await this.attributeService.getAttributes(userId, search);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateAttribute(req: CustomRequest, res: Response): Promise<Response> {
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
    const result = await this.attributeService.updateAttribute(
      data,
      userId,
      attrId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteAttribute(req: CustomRequest, res: Response): Promise<Response> {
    const attrId = req.params.attrId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.attributeService.deleteAttribute(userId, attrId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async assignAttrsToCategory(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const attrIds = req.body;
    const categoryId = req.params.categoryId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.attributeService.assignAttrsToCategory(
      userId,
      categoryId,
      attrIds
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getCategoryAttrsAndSubs(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const categoryId = req.params.categoryId;

    const result = await this.attributeService.getCategoryAttrsAndSubs(
      categoryId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json(result);
  }

  async deleteCategoryAttr(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    const categoryId = req.params.categoryId;
    const attrId = req.params.attrId;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }
    const result = await this.attributeService.deleteCategoryAttr(
      userId,
      attrId,
      categoryId
    );
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json(result);
  }
}
