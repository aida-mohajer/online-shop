import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
      pagination?: Pagination;
      search?: Search;
    }
  }
}
