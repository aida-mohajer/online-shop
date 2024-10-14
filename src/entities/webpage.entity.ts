import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WebPage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  url!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;
}
