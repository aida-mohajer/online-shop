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

@Entity({ name: "cartItem" })
export class CartItem extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  userId!: string;

  @Column({ nullable: false })
  productId!: string;

  @Column({ nullable: false })
  quantity!: number;

  @ManyToOne(() => User, (user) => user.cartItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(() => Product, (product) => product.cartItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Product;
}
