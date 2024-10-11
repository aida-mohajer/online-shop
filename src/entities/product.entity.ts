import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Base } from "./base.entity";
import { Category } from "./category.entity";
import { CartItem } from "./cartItem.entity";
import { Wishlist } from "./wishlist.entity";
import { Feedback } from "./feedback.entity";
import { Order } from "./order.entity";
import { ProductImages } from "./product-images.entity";
import { SubAttributes } from "./subattribues.entity";

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
  rating!: number;

  @Column({ nullable: false })
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoryId" })
  category!: Category;

  @OneToMany(() => ProductImages, (image) => image.product)
  images!: ProductImages[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems!: CartItem[];

  @OneToMany(() => Wishlist, (wishlistItem) => wishlistItem.product)
  wishlistItems!: Wishlist[];

  @OneToMany(() => Feedback, (feedback) => feedback.product)
  feedbacks!: Feedback[];

  @OneToMany(() => Order, (orderItem) => orderItem.product)
  orderItems!: Order[];

  @ManyToMany(() => SubAttributes, (subAttribute) => subAttribute.products)
  @JoinTable({ name: "product_subAttributes" })
  subAttributes!: SubAttributes[];
}
