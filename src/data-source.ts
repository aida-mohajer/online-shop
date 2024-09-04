import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Product } from "./entities/product.entity";
import { Category } from "./entities/category.entity";
import { CartItem } from "./entities/cartItem.entity";
import { Wishlist } from "./entities/wishlist.entity";
import { Order } from "./entities/order.entity";
import { Feedback } from "./entities/feedback.entity";

dotenv.config();

const secret = process.env.JWT_SECRET;

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: "mssql",
  host: DB_HOST,
  port: parseInt(DB_PORT || "1433"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,

  synchronize: true,
  logging: NODE_ENV === "dev",
  entities: [User, Product, Category, CartItem, Wishlist, Order, Feedback],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  options: {
    encrypt: false,
  },
  extra: {
    requestTimeout: 60000,
  },
});
