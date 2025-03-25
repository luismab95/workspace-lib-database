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
import { Role } from "./role.entity";

@Entity({ name: "user_role", schema: "security" })
@Unique(["userId", "roleId"])
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "user_id",
    type: "int",
    nullable: false,
  })
  userId!: number;

  @Column({
    name: "role_id",
    type: "int",
    nullable: false,
  })
  roleId!: number;

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
  user!: User;

  @ManyToOne(() => Role, (role) => role.role)
  @JoinColumn({ name: "role_id" })
  role!: Role;
}
