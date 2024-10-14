import express, { Response } from "express";
import { WebPageService } from "./webpage.service";
import { WebPageController } from "./webpage.controller";
import { authentication, CustomRequest } from "../middlewares/authentication";
import { validateUrl } from "./validations/url.validation";

export const webpageRouter = express.Router();
const webpageService = new WebPageService();
const webpageController = new WebPageController(webpageService);

webpageRouter.get(
  "/etl",
  authentication,
  validateUrl,
  async (req: CustomRequest, res: Response) => {
    return await webpageController.extractPageData(req, res);
  }
);
