import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity({ name: "feedback" })
export class Feedback extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  userId!: string;

  @Column({ nullable: false })
  productId!: string;

  @Column({ nullable: false })
  rating!: number;

  @Column({ nullable: false })
  comment!: string;

  @ManyToOne(() => User, (user) => user.feedbacks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Product, (product) => product.feedbacks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Product;
}
