import { AppDataSource } from "../data-source";
import { Feedback } from "../entities/feedback.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { Pagination } from "../middlewares/pagination";
import { FeedbackDto } from "./dto/feedback.dto";
import { ReadGetAllFeedbackDto } from "./dto/raed-getAll-feedback.dto";
import { ReadFeedbackDto } from "./dto/read-feedback.dto";

export class FeedbackService {
  constructor(
    private feedbackRepository = AppDataSource.getRepository(Feedback),
    private userRepository = AppDataSource.getRepository(User),
    private productRepository = AppDataSource.getRepository(Product)
  ) {}

  async createFeedback(
    data: FeedbackDto,
    userId: string,
    productId: string
  ): Promise<ReadFeedbackDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return { error: "User not found" };
      }

      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        return { error: "Product not found" };
      }

      const existFeedback = await this.feedbackRepository.findOne({
        where: { userId: userId, productId: productId },
      });
      if (existFeedback) {
        return { error: "You have already a feedback for this product" };
      }

      const feedback = this.feedbackRepository.create({
        userId: user.id,
        productId: product.id,
        rating: data.rating,
        comment: data.comment,
      });

      await this.feedbackRepository.save(feedback);

      const rates = await this.feedbackRepository.count({
        where: { productId: product.id },
      });
      const sumOfRatingsResult = await this.feedbackRepository
        .createQueryBuilder("feedback")
        .select("SUM(feedback.rating)", "sum")
        .where("feedback.productId = :productId", { productId: product.id })
        .getRawOne();

      const sumOfRatings = sumOfRatingsResult?.sum || 0;
      const avgRate = rates > 0 ? sumOfRatings / rates : 0;
      product.rating = avgRate;
      await this.productRepository.save(product);

      return {
        rating: feedback.rating,
        comment: feedback.comment,
        createdAt: feedback.createdAt,
      };
    } catch (error) {
      console.error("Error during create feedback", error);
      return { error: "Internal server error" };
    }
  }

  async getFeedbacks(
    productId: string,
    pagination: Pagination
  ): Promise<ReadGetAllFeedbackDto> {
    const { skip, limit } = pagination;
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        return { error: "Product not found" };
      }
      const [allFeedback, totalFeedback] = await this.feedbackRepository
        .createQueryBuilder("feedback")
        .select([
          "feedback.id",
          "feedback.comment",
          "feedback.rating",
          "feedback.userId",
          "feedback.productId",
          "feedback.createdAt",
        ])
        .where("feedback.productId = :productId", { productId: productId })
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      const totalPages = Math.ceil(totalFeedback / limit);

      return {
        message:
          totalFeedback > 0
            ? "Feedbacks retrieved successfully"
            : "No feedback found.",
        response: allFeedback,
        totalPages,
        totalFeedback,
      };
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      return { error: "Internal server error" };
    }
  }

  async updateFeedback(
    data: FeedbackDto,
    feedbackId: string,
    userId: string
  ): Promise<ReadFeedbackDto> {
    try {
      const feedback = await this.feedbackRepository.findOne({
        where: { id: feedbackId },
      });
      if (!feedback) {
        return { error: "Feedback not found" };
      }
      if (feedback.userId !== userId) {
        return { error: "You are not authorized to update this feedback" };
      }
      Object.assign(feedback, data);

      await this.feedbackRepository.save(feedback);

      return {
        rating: feedback.rating,
        comment: feedback.comment,
        updatedAt: feedback.updatedAt,
        message: "Feedback updated successfully",
      };
    } catch (error) {
      console.error("Error during update feedback", error);
      return { error: "Internal server error" };
    }
  }

  async deleteFeedback(
    feedbackId: string,
    userId: string
  ): Promise<{ error?: string; message?: string }> {
    try {
      const feedback = await this.feedbackRepository.findOne({
        where: { id: feedbackId },
      });
      if (!feedback) {
        return { error: "Feedback not found" };
      }

      if (feedback.userId !== userId) {
        return { error: "You are not authorized to delete this feedback" };
      }
      await this.feedbackRepository.remove(feedback);
      return { message: "Feedback removed successfully" };
    } catch (error) {
      console.error("Error during removing feedback", error);
      return { error: "Internal server error" };
    }
  }
}
