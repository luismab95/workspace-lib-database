import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Module } from "./module.entity";

@Entity({ name: "menu", schema: "security" })
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "name",
    type: "varchar",
    unique: true,
    length: 100,
  })
  name!: string;

  @Column({
    name: "url",
    type: "varchar",
    nullable: false,
  })
  url!: string;

  @Index({ unique: true })
  @Column({
    name: "path",
    type: "varchar",
    unique: true,
    nullable: false,
  })
  path!: string;

  @Column({
    name: "type_remote",
    type: "varchar",
    nullable: false,
    default: "module",
  })
  typeRemote!: string;

  @Column({
    name: "exposed_module",
    type: "varchar",
    nullable: true,
  })
  exposedModule!: string;

  @Column({
    name: "icon",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  icon!: string;

  @Column({
    name: "is_auth_route",
    type: "boolean",
    default: true,
    nullable: false,
  })
  isAuthRoute!: boolean;

  @Column({
    name: "type",
    type: "varchar",
    length: 255,
    nullable: true,
    default: "link",
  })
  type!: string;

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
    name: "menu_id",
    type: "int",
    nullable: true,
  })
  menuId!: number | null;

  @Column({
    name: "module_id",
    type: "int",
    nullable: false,
  })
  moduleId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => Menu, (menu) => menu.children)
  @JoinColumn({ name: "menu_id" })
  parent!: Menu;

  @OneToMany(() => Menu, (menu) => menu.parent)
  children!: Menu[];

  @ManyToOne(() => Module, (module) => module.menu)
  @JoinColumn({ name: "module_id" })
  module!: Module;
}
