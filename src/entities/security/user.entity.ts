import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Session } from "./sessions.entity";
import { OtpUser } from "./otp-user.entity";

export interface ScopeInterface {
  version: string;
  resource: ScopeResourceInterface[];
}

export interface ScopeResourceInterface {
  code: string;
  tableName?: string;
  value?: string;
  name?: string;
  id?: number;
}

@Entity({ name: "user", schema: "security" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({
    name: "email",
    type: "varchar",
    unique: true,
    length: 100,
    nullable: false,
  })
  email!: string;

  @Column({ name: "password", nullable: true, type: "text" })
  password!: string;

  @Column({
    name: "firstname",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  firstname!: string;

  @Column({
    name: "lastname",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  lastname!: string;

  @Column({
    name: "status",
    type: "boolean",
    nullable: false,
    default: true,
  })
  status!: boolean;

  @Column({
    name: "type",
    type: "enum",
    enum: ["L", "G"],
    comment: "L Login LOCAL, G Login GOOGLE",
    nullable: false,
    default: "L",
  })
  type!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @OneToMany(() => Session, (sessions) => sessions.user)
  sessions!: Session[];

  @OneToMany(() => OtpUser, (otpUser) => otpUser.user)
  otpUsers!: OtpUser[];
}
