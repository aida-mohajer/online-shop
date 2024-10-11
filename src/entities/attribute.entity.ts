import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Base } from "./base.entity";
import { SubAttributes } from "./subattribues.entity";
import { Category } from "./category.entity";

@Entity("attribute")
export class Attribute extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => SubAttributes, (subAttribute) => subAttribute.attribute)
  subAttributes!: SubAttributes[];

  @ManyToMany(() => Category, (category) => category.attributes)
  categories!: Category[];
}
