import express, { Response } from "express";
import { UploadImageService } from "./image.service";
import { UploadImageController } from "./image.controller";
import { authentication, CustomRequest } from "../middlewares/authentication";
import { imageUpload } from "../middlewares/upload";

export const uploadImageRouter = express.Router();
const uploadImageService = new UploadImageService();
const uploadImageController = new UploadImageController(uploadImageService);

uploadImageRouter.post(
  "/upload",
  authentication,
  imageUpload,
  async (req: CustomRequest, res: Response) => {
    return await uploadImageController.uploadCover(req, res);
  }
);

uploadImageRouter.get(
  "/",
  authentication,
  async (req: CustomRequest, res: Response) => {
    return await uploadImageController.getImages(req, res);
  }
);

uploadImageRouter.delete(
  "/remove/:fileName",
  authentication,
  async (req: CustomRequest, res: Response) => {
    return await uploadImageController.deleteCover(req, res);
  }
);
