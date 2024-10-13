import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { fa } from "@faker-js/faker";

@Entity()
export class ProductVersion {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  productId!: string;

  @ManyToOne(() => Product, (product) => product.versions)
  @JoinColumn({ name: "productId" })
  product!: Product;

  @Column()
  versionNumber!: number;

  @Column()
  productName!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
