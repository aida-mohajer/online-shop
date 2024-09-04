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

@Entity({ name: "order" })
export class Order extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  userId!: string | null;

  @Column({ nullable: true })
  productId!: string | null;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ nullable: false })
  totalPrice!: number;

  @ManyToOne(() => User, (user) => user.orderItems)
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "productId" })
  product!: Product;
}
