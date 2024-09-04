import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { Encrypt } from "../helpers/encrypt";
import { ReadSignupDto } from "./dto/read-signup.dto";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { ReadLoginDto } from "./dto/read-login.dto";
import { ReadGetUserDto } from "./dto/read-get-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ReadUpdateUserDto } from "./dto/read-update-user.dto";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { EntityManager } from "typeorm";

export class UserService {
  constructor(private userRepository = AppDataSource.getRepository(User)) {}
  async signup(data: SignupDto): Promise<ReadSignupDto> {
    try {
      const existEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (existEmail) {
        return { error: "Email already exists" };
      }

      const existUsername = await this.userRepository.findOne({
        where: { username: data.username },
      });

      if (existUsername) {
        return { error: "Username already exists" };
      }

      const encryptedPassword = await Encrypt.encryptPass(data.password);

      const user = this.userRepository.create({
        username: data.username,
        email: data.email,
        password: encryptedPassword,
        age: data.age,
        role: data.role,
      });

      await this.userRepository.save(user);
      return {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        message: "User signed up successfully",
      };
    } catch (error) {
      console.error("Error during signup:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async login(data: LoginDto): Promise<ReadLoginDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: data.username },
      });

      if (!user) {
        return { error: "User not found" };
      }

      const isPasswordValid = await Encrypt.comparePassword(
        data.password,
        user.password
      );

      const dto = new ReadLoginDto();
      if (isPasswordValid) {
        const token = Encrypt.generateToken({ id: user.id, role: user.role });
        dto.token = token;
        dto.role = user.role;
        dto.message = "User logged in successfully";
        return dto;
      } else {
        return { error: "Password is incorrect" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async getUser(userId: string): Promise<ReadGetUserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        return { error: "User not found" };
      }
      const dto = new ReadGetUserDto();
      dto.username = user.username;
      dto.email = user.email;
      dto.message = "User retrieved successfully";
      return dto;
    } catch (error) {
      console.error("Error during retrieve user:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async updateUser(
    userId: string,
    data: UpdateUserDto
  ): Promise<ReadUpdateUserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        return { error: "User not found" };
      }

      Object.assign(user, data);
      if (data.password) {
        user.password = await Encrypt.encryptPass(data.password);
      }

      await this.userRepository.save(user);

      return {
        username: user.username,
        email: user.email,
        age: user.age,
        updatedAt: user.updatedAt,
        message: "User updated successfully",
      };
    } catch (error) {
      console.error("Error during updating user:", error);
      return { error: " An unexpected error occured" };
    }
  }

  async deleteUser(
    userId: string
  ): Promise<{ error?: string; message?: string }> {
    const entityManager = AppDataSource.createEntityManager();

    return await entityManager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const user = await transactionalEntityManager.findOne(User, {
            where: { id: userId },
          });
          if (!user) {
            return { error: "User not found" };
          }

          await transactionalEntityManager.update(
            Order,
            { userId },
            { userId: null }
          );

          await transactionalEntityManager.delete(Product, { userId });
          await transactionalEntityManager.delete(User, { id: userId });

          return { message: "User deleted successfully" };
        } catch (error) {
          console.error("Error during deleting user:", error);
          return { error: "An unexpected error occurred" };
        }
      }
    );
  }
}
