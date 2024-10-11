import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class CategoryViewLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  categoryId!: string;

  @Column()
  ipAddress!: string;

  @Column()
  viewedAt!: Date;

  @ManyToOne(() => Category, (category) => category.viewLogs)
  @JoinColumn({ name: "categoryId" })
  category!: Category;
}
