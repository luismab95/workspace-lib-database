import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { Session } from "./sessions.entity";
import { OtpUser } from "./otp-user.entity";
import { LoginAttempt } from "./login-attempts.entity";
import { UserRole } from "./user-role.entity";
import { UserPermission } from "./user-permission.entity";
import { Entities } from "./entity.entity";
import { AdminAccount } from "./admin-account.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";

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
    name: "code",
    type: "varchar",
    unique: true,
    length: 8,
    nullable: false,
  })
  code!: string;

  @BeforeInsert()
  randonCode() {
    this.code = randomCharacters("COMBINED", 8).toUpperCase();
  }

  @Index({ unique: true })
  @Column({
    name: "email",
    type: "varchar",
    unique: true,
    length: 100,
    nullable: false,
  })
  email!: string;

  @Index({ unique: true })
  @Column({
    name: "username",
    type: "varchar",
    unique: true,
    length: 100,
    nullable: false,
  })
  username!: string;

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
    name: "entity_id",
    type: "int",
    nullable: false,
  })
  entityId!: number;

  @Index({ unique: true })
  @Column({
    name: "identification",
    type: "varchar",
    nullable: false,
    unique: true,
    length: 13,
  })
  identification!: string;

  @Column({
    name: "scopes",
    type: "json",
    nullable: true,
  })
  scopes!: ScopeInterface;

  @Column({
    name: "status",
    type: "boolean",
    nullable: false,
    default: true,
  })
  status!: boolean;

  @Column({
    name: "terms",
    type: "boolean",
    nullable: false,
    default: false,
  })
  terms!: boolean;

  @Column({
    name: "validate",
    type: "boolean",
    nullable: false,
    default: false,
  })
  validate!: boolean;

  @Column({
    name: "two_factor_auth",
    type: "boolean",
    nullable: false,
    default: false,
  })
  twoFactorAuth!: boolean;

  @Column({
    name: "photo",
    type: "varchar",
    nullable: true,
  })
  photo!: string;

  @Column({
    name: "is_bloqued",
    type: "boolean",
    nullable: false,
    default: false,
  })
  isBloqued!: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @OneToMany(() => Session, (sessions) => sessions.user)
  sessions!: Session[];

  @OneToMany(() => LoginAttempt, (loginAttempt) => loginAttempt.user)
  loginAttempts!: LoginAttempt[];

  @ManyToOne(() => Entities, (entity) => entity.user)
  @JoinColumn({ name: "entity_id" })
  entity!: Entities;

  @OneToMany(() => OtpUser, (otpUser) => otpUser.user)
  otpUsers!: OtpUser[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  user!: UserRole[];

  @OneToMany(() => UserPermission, (UserPermission) => UserPermission.user)
  userPermission!: UserPermission[];

  @OneToMany(() => AdminAccount, (adminAccount) => adminAccount.user)
  adminAccounts!: AdminAccount[];
}
