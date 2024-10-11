import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { Base } from "./base.entity";
import { Attribute } from "./attribute.entity";
import { Product } from "./product.entity";

@Entity("sub-attributes")
export class SubAttributes extends Base {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  value!: string;

  @Column()
  attributeId!: string;

  @ManyToOne(() => Attribute, (attr) => attr.subAttributes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "attributeId" })
  attribute!: Attribute;

  @ManyToMany(() => Product, (product) => product.subAttributes)
  products!: Product[];
}
