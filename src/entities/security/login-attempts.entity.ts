import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "login_attempt", schema: "security" })
export class LoginAttempt {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "attempt",
    type: "int",
    nullable: false,
  })
  attempt!: number;

  @Column({
    name: "user_id",
    type: "int",
    nullable: false,
  })
  userId!: number;

  @Column({
    name: "status",
    type: "boolean",
    nullable: false,
    default: true,
  })
  status!: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.loginAttempts)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
