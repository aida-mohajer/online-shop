import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { CartItem } from "./cartItem.entity";
import { Wishlist } from "./wishlist.entity";
import { Order } from "./order.entity";
import { Feedback } from "./feedback.entity";

@Entity({ name: "user" })
export class User extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  username!: string;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  age!: number;

  @Column({ default: "user" })
  role!: string;

  @OneToMany(() => Order, (orderItem) => orderItem.user)
  orderItems!: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems!: CartItem[];

  @OneToMany(() => Wishlist, (wishlistItem) => wishlistItem.user)
  wishlistItems!: Wishlist[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks!: Feedback[];
}
