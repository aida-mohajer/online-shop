import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Pagination } from "./pagination";

dotenv.config();

export interface CustomRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
  pagination?: Pagination;
}

export const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      message: "Internal Server Error: JWT Secret not configured. ",
    });
  }
  try {
    const decoded = jwt.verify(token, secret) as { id: string; role: string };
    // req.user = { userId: (decoded as any).id };
    req.user = { userId: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
