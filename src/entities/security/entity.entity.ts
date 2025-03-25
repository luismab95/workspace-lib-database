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
import { UserTypeLogin } from "./user-type-login.entity";
import { User } from "./user.entity";
import { UserType } from "./user_type.entity";
import { Parameter } from "./parameter.entity";
import { Permission } from "./permission.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";

export interface AuthBrokerInterface {
  google?: GoogleInterface;
  local?: LocalInterface;
  ad?: AdInterface;
}

export interface AdInterface {
  host: string;
  port: number;
  domain: string;
  username: string;
  password: string;
  secure: boolean;
}

export interface GoogleInterface {
  domain: string;
}

export interface LocalInterface {}

@Entity({ name: "entity", schema: "security" })
export class Entities {
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
    name: "code_ext",
    type: "varchar",
    unique: true,
    length: 100,
    nullable: false,
  })
  codeExt!: string;

  @Index({ unique: true })
  @Column({
    name: "identification",
    type: "varchar",
    nullable: false,
    unique: true,
    length: 13,
  })
  identification!: string;

  @Index({ unique: true })
  @Column({
    name: "name",
    type: "varchar",
    unique: true,
    length: 100,
  })
  name!: string;

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
    name: "login_type_id",
    type: "int",
    nullable: false,
  })
  loginTypeId!: number;

  @Column({
    name: "user_type_id",
    type: "int",
    nullable: false,
  })
  userTypeId!: number;

  @Column({
    name: "auth",
    type: "json",
    nullable: false,
  })
  auth!: AuthBrokerInterface;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => UserTypeLogin, (userTypeLogin) => userTypeLogin.entity)
  @JoinColumn({ name: "login_type_id" })
  userTypeLogin!: UserTypeLogin;

  @ManyToOne(() => UserType, (userType) => userType.entity)
  @JoinColumn({ name: "user_type_id" })
  userType!: UserType;

  @OneToMany(() => User, (user) => user.entity)
  user!: User[];

  @OneToMany(() => Permission, (permission) => permission.entity)
  permission!: Permission[];

  @OneToMany(() => Parameter, (parameter) => parameter.entity)
  parameter!: Parameter[];
}
