import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Menu } from "./menu.entity";

@Entity({ name: "module", schema: "security" })
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({
    name: "name",
    type: "varchar",
    unique: true,
    length: 100,
  })
  name!: string;

  @Column({
    name: "description",
    type: "varchar",
    length: 255,
  })
  description!: string;

  @Column({
    name: "status",
    type: "boolean",
    nullable: false,
    default: true,
  })
  status!: boolean;

  @Column({
    name: "icon",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  icon!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @OneToMany(() => Menu, (menu) => menu.module)
  menu!: Menu[];
}
