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
import { Product } from "./product.entity";
import { Base } from "./base.entity";
import { Attribute } from "./attribute.entity";
import { CategoryViewLog } from "./category-view.entity";

@Entity({ name: "category" })
export class Category extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  categoryName!: string;

  @Column({ type: "int", default: 0 })
  viewCount!: number;

  @Column({ nullable: true })
  parentCategoryId!: string | null;

  @OneToMany(() => Category, (category) => category.parentCategory)
  subcategories!: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];

  @OneToMany(() => CategoryViewLog, (viewLog) => viewLog.category)
  viewLogs!: CategoryViewLog[];

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
  })
  @JoinColumn({ name: "parentCategoryId" })
  parentCategory!: Category | null;

  @ManyToMany(() => Attribute, (attribute) => attribute.categories, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "category_attributes" })
  attributes!: Attribute[];
}
