import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { CartItem } from "./cartItem.entity";
import { Wishlist } from "./wishlist.entity";
import { Feedback } from "./feedback.entity";
import { Order } from "./order.entity";

@Entity({ name: "product" })
export class Product extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  productName!: string;

  @Column({ nullable: false })
  price!: number;

  @Column({ nullable: false })
  description!: string;

  @Column({ nullable: false })
  userId!: string;

  @Column({ nullable: false })
  categoryId!: string;

  @ManyToOne(() => User, (user) => user.createdProducts)
  @JoinColumn({ name: "userId" })
  createdBy!: User;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoryId" })
  category!: Category;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems!: CartItem[];

  @OneToMany(() => Wishlist, (wishlistItem) => wishlistItem.product)
  wishlistItems!: Wishlist[];

  @OneToMany(() => Feedback, (feedback) => feedback.product)
  feedbacks!: Feedback[];

  @OneToMany(() => Order, (orderItem) => orderItem.product)
  orderItems!: Order[];
}
