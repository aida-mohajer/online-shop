import axios from "axios";
import * as cheerio from "cheerio";
export const etl = async (url: string) => {
  try {
    const response = await axios.get(url);
    // console.log("Response data:", response.data);

    if (!response.data || typeof response.data !== "string") {
      throw new Error("No valid HTML data returned from the URL.");
    }

    const $ = cheerio.load(response.data);

    const title = $("title").text() || "No title found";
    const description = $('meta[name="description"]').attr("content") || "";

    if (!description) {
      console.log(
        "Meta description not found, attempting alternative extraction"
      );
    }

    return { title, description, url };
  } catch (error) {
    console.error(
      "Error during data extraction:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};
