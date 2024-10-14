import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { etl } from "./etl";
import { loadData } from "./load";

export class WebPageService {
  constructor(private userRepository = AppDataSource.getRepository(User)) {}
  async extractPageData(
    userId: string,
    url: string
  ): Promise<{ message?: string; error?: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found" };
      }
      const data = await etl(url);
      await loadData(data);

      console.log(data);

      return {
        message: "Data extracted and saved successfully",
      };
    } catch (error) {
      console.error("ETL Error:", error);
      return { error: "An unexpected error occurred" };
    }
  }
}
