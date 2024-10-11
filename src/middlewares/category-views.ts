import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../categories/category.service";

const VIEW_COUNT_COOKIE_NAME = "viewed_categories";
const viewCooldown = 50 * 1000; //50s

export const trackCategoryView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.categoryId;
  const xForwardedFor = req.headers["x-forwarded-for"];
  const ipAddress = Array.isArray(xForwardedFor)
    ? xForwardedFor[0]
    : xForwardedFor || req.ip || "127.0.0.1";
  //   const ipAddress: string = req.ip || "127.0.0.1";
  const currentTime = Date.now();

  console.log(ipAddress);

  // Parse the viewed categories from the cookie
  const viewedCategories = req.cookies[VIEW_COUNT_COOKIE_NAME]
    ? JSON.parse(req.cookies[VIEW_COUNT_COOKIE_NAME])
    : {};

  const service = new CategoryService();

  const result = await service.handleCategoryView(
    categoryId,
    ipAddress,
    currentTime,
    viewCooldown
  );

  if (!result.success) {
    return res.status(404).json({ message: result.error });
  }

  const lastViewedTime = viewedCategories[categoryId] || 0;

  // If the category wasn't viewed recently (in the cookie), update the cookie
  if (currentTime - lastViewedTime > viewCooldown) {
    viewedCategories[categoryId] = currentTime;
    res.cookie(VIEW_COUNT_COOKIE_NAME, JSON.stringify(viewedCategories), {
      maxAge: viewCooldown,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  console.log("Cookie Set:", viewedCategories);
  next();
};
