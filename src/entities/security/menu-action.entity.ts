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
import { Menu } from "./menu.entity";
import { ResourceAction } from "./resource-action.entity";

@Entity({ name: "menu_action", schema: "security" })
@Unique(["menuId", "actionId"])
export class MenuAction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "menu_id",
    type: "int",
    nullable: false,
  })
  menuId!: number;

  @Column({
    name: "action_id",
    type: "int",
    nullable: false,
  })
  actionId!: number;

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

  @ManyToOne(() => Menu, (menu) => menu.menuAction)
  @JoinColumn({ name: "menu_id" })
  menu!: Menu;

  @ManyToOne(
    () => ResourceAction,
    (resourceAction) => resourceAction.resourceAction
  )
  @JoinColumn({ name: "action_id" })
  resourceAction!: ResourceAction;
}
