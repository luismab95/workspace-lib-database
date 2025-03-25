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
import { User } from "./user.entity";
import { Permission } from "./permission.entity";

@Entity({ name: "user_permission", schema: "security" })
@Unique(["userId", "permissionId"])
export class UserPermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "user_id",
    type: "int",
    nullable: false,
  })
  userId!: number;

  @Column({
    name: "permission_id",
    type: "int",
    nullable: false,
  })
  permissionId!: number;

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

  @ManyToOne(() => User, (user) => user.user)
  @JoinColumn({ name: "user_id" })
  user!: Permission;

  @ManyToOne(() => Permission, (permission) => permission.userPermission)
  @JoinColumn({ name: "permission_id" })
  permission!: Permission;

}
