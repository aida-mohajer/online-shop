import { Request, Response, NextFunction } from "express";

export const validateUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).json({
      error: "URL is required.",
    });
  }

  const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}([\/\w .-]*)*\/?$/i;

  if (!regex.test(url)) {
    return res.status(400).json({
      error: "Invalid url format. Please provide a valid url.",
    });
  }

  next();
};
