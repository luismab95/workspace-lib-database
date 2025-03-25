import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "session", schema: "security" })
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "ip_address",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  ipAddress!: string;

  @Column({
    name: "token",
    type: "text",
    nullable: false,
  })
  token!: string;

  @Column({
    name: "detail",
    type: "text",
    nullable: false,
  })
  detail!: string;

  @Column({
    name: "active",
    type: "boolean",
    nullable: false,
    default: true,
  })
  active!: boolean;

  @Column({
    name: "user_id",
    type: "int",
    nullable: false,
  })
  userId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
