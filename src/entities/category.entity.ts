import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Base } from "./base.entity";

@Entity({ name: "category" })
export class Category extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  categoryName!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
