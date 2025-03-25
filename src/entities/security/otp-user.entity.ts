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

@Entity({ name: "opt_user", schema: "security" })
export class OtpUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "otp",
    type: "varchar",
    nullable: false,
  })
  otp!: string;

  @Column({
    name: "used",
    type: "boolean",
    nullable: false,
    default: false,
  })
  used!: boolean;


  @Column({
    name: "type",
    type: "enum",
    enum: ["L", "R"],
    comment: "L Login de usuario, R Recuperación de contraseña",
    nullable: false,
    default: "L",
  })
  type!: string;

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

  @ManyToOne(() => User, (user) => user.otpUsers)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
