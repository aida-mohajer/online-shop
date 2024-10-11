import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { Base } from "./base.entity";

@Entity({ name: "product-Images" })
export class ProductImages extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  imageName!: string;

  @Column({ nullable: false })
  imageType!: string;

  @Column({ nullable: false })
  productId!: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Product;
}
