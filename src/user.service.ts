import { User } from "./entities/user.entity";
import { AppDataSource } from "./data-source";

export async function getAllUsers(): Promise<User[]> {
  const userRepository = AppDataSource.getRepository(User);

  // Fetch all users
  const users = await userRepository.find();
  return users;
}
