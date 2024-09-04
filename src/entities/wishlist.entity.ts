import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name: "wishlist" })
export class Wishlist extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  userId!: string;

  @Column({ nullable: false })
  productId!: string;

  @ManyToOne(() => User, (user) => user.wishlistItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Product, (product) => product.wishlistItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Product;
}
