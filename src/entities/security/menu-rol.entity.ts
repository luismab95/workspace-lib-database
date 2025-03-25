import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
  Unique,
} from "typeorm";
import { Role } from "./role.entity";
import { Menu } from "./menu.entity";

@Entity({ name: "menu_rol", schema: "security" })
@Unique(["menuId", "roleId"])
export class MenuRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "menu_id",
    type: "int",
    nullable: false,
  })
  menuId!: number;

  @Column({
    name: "role_id",
    type: "int",
    nullable: false,
  })
  roleId!: number;

  @Column({
    name: "order",
    type: "int",
    nullable: false,
  })
  order!: number;

  @Column({
    name: "status",
    type: "boolean",
    nullable: false,
    default: true,
  })
  status!: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => Menu, (menu) => menu.menu)
  @JoinColumn({ name: "menu_id" })
  menu!: Menu;

  @ManyToOne(() => Role, (role) => role.role)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
