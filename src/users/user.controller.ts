import { Request, Response } from "express";
import { UserService } from "./user.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CustomRequest } from "../middlewares/authentication";

export class UserController {
  constructor(private userService: UserService) {}
  async signup(req: Request, res: Response): Promise<Response> {
    const data: SignupDto = req.body;
    const result = await this.userService.signup(data);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const data: LoginDto = req.body;
    const result = await this.userService.login(data);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async getUser(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.userService.getUser(userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async updateUser(req: CustomRequest, res: Response): Promise<Response> {
    const data: UpdateUserDto = req.body;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.userService.updateUser(userId, data);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }

  async deleteUser(req: CustomRequest, res: Response): Promise<Response> {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No userId" });
    }
    const result = await this.userService.deleteUser(userId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(201).json(result);
  }
}
