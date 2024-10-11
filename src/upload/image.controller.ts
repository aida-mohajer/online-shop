import { Response } from "express";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { UploadImageService } from "./image.service";
import { CustomRequest } from "../middlewares/authentication";

export class UploadImageController {
  constructor(private uploadImgService: UploadImageService) {}

  async uploadCover(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User does not have permission" });
    }

    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    try {
      const originalDir = path.join(__dirname, "../public/images/originals");
      const optimizedDir = path.join(__dirname, "../public/images/optimized");

      // Ensure directories exist
      if (!fs.existsSync(originalDir)) {
        fs.mkdirSync(originalDir, { recursive: true });
      }
      if (!fs.existsSync(optimizedDir)) {
        fs.mkdirSync(optimizedDir, { recursive: true });
      }

      const uploadedFiles = req.files as Express.Multer.File[];
      const response = [];

      for (const file of uploadedFiles) {
        const timestamp = Date.now();

        const originalFileName = `${timestamp}-${
          path.parse(file.originalname).name
        }.webp`;
        const originalFilePath = path.join(originalDir, originalFileName);
        await sharp(file.buffer).toFile(originalFilePath);

        const optimizedFileName = `opt-${timestamp}-${
          path.parse(file.originalname).name
        }.webp`;
        const optimizedFilePath = path.join(optimizedDir, optimizedFileName);

        await sharp(file.buffer)
          .resize({ width: 400, height: 300, fit: sharp.fit.inside })
          .webp({ quality: 70 })
          .toFile(optimizedFilePath);

        // const originalSize = fs.statSync(originalFilePath).size;
        // const optimizedSize = fs.statSync(optimizedFilePath).size;

        // console.log(`Original Size: ${originalSize} bytes`);
        // console.log(`Optimized Size: ${optimizedSize} bytes`);

        response.push({
          originalFileName,
          optimizedFileName,
          // originalSize,
          // optimizedSize,
        });
      }

      return res.status(201).json({
        success: true,
        files: response,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error processing images." });
    }
  }

  async getImages(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User does not have permission" });
    }

    try {
      const originalDir = path.join(__dirname, "../public/images/originals");

      // Read original images
      const originalImages = fs.readdirSync(originalDir).map((file) => ({
        fileName: file,
      }));

      return res.status(200).json({
        success: true,
        originalImages,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error retrieving images." });
    }
  }
  async deleteCover(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }

    const role = req.user?.role;
    if (role !== "admin") {
      return res.status(401).json({ error: "User does not have permission" });
    }

    const fileName = req.params.fileName;

    if (!fileName) {
      return res
        .status(400)
        .json({ success: false, message: "No file name provided" });
    }

    try {
      const originalDir = path.join(__dirname, "../public/images/originals");
      const optimizedDir = path.join(__dirname, "../public/images/optimized");

      const originalFilePath = path.join(originalDir, fileName);
      const optimizedFilePath = path.join(optimizedDir, `opt-${fileName}`);

      // Check if the image is stored in the database
      const imageCheck = await this.uploadImgService.findCoverByFileName(
        fileName,
        userId
      );

      if (imageCheck?.error) {
        return res
          .status(400)
          .json({ success: false, message: imageCheck.error });
      }

      // Remove original file if it exists
      if (fs.existsSync(originalFilePath)) {
        fs.unlinkSync(originalFilePath);
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Original file not found" });
      }

      // Remove optimized file if it exists
      if (fs.existsSync(optimizedFilePath)) {
        fs.unlinkSync(optimizedFilePath);
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Optimized file not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "File deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error deleting file." });
    }
  }
}
