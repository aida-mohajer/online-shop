import { AppDataSource } from "../data-source";
import { WebPage } from "../entities/webpage.entity";

export const loadData = async (data: {
  url: string;
  title: string;
  description: string;
}) => {
  const webPageRepository = AppDataSource.getRepository(WebPage);
  const webPage = webPageRepository.create(data);
  await webPageRepository.save(webPage);
};
