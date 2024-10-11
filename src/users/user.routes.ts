import express from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Request, Response } from "express";
import { validateSignupDto } from "./validations/signup.validation";
import { validateLoginDto } from "./validations/login.validations";
import { authentication } from "../middlewares/authentication";
import { validateUpdateDto } from "./validations/update-user.validation";
import { validateUserId } from "./validations/userId.validation";

export const usersRouter = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

usersRouter.post(
  "/signup",
  validateSignupDto,
  async (req: Request, res: Response) => {
    return await userController.signup(req, res);
  }
);

usersRouter.post(
  "/login",
  validateLoginDto,
  async (req: Request, res: Response) => {
    return await userController.login(req, res);
  }
);
usersRouter.get(
  "/:userId",
  validateUserId,
  async (req: Request, res: Response) => {
    return await userController.getUser(req, res);
  }
);

usersRouter.put(
  "",
  authentication,
  validateUpdateDto,
  async (req: Request, res: Response) => {
    return await userController.updateUser(req, res);
  }
);

usersRouter.delete("", authentication, async (req: Request, res: Response) => {
  return await userController.deleteUser(req, res);
});
