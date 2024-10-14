import { Response } from "express";
import { CustomRequest } from "../middlewares/authentication";
import { WebPageService } from "./webpage.service";

export class WebPageController {
  constructor(private webpageService: WebPageService) {}
  async extractPageData(req: CustomRequest, res: Response): Promise<Response> {
    const url = req.query.url as string;

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User not have permission" });
    }

    const result = await this.webpageService.extractPageData(userId, url);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);
  }
}
