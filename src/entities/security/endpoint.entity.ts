import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EndpointEnv } from "./endpoint-env.entity";
import { EndpointVersion } from "./endpoint-version.entity";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface HeadersParamsInterface {
  key: string;
  type?: string;
  value?: string;
}

@Entity({ name: "endpoint", schema: "security" })
export class Endpoint {
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
    this.code = Math.random().toString(36).substring(2, 10).toUpperCase();
  }

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
    name: "err_message",
    type: "varchar",
    nullable: false,
  })
  errMessage!: string;

  @Column({
    name: "method",
    enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    type: "varchar",
    length: 6,
  })
  method!: MethodType;

  @Column({
    name: "cache",
    type: "boolean",
    default: false,
  })
  cache!: boolean;

  @Column({
    name: "time_out",
    type: "int",
  })
  timeOut!: number;

  @Column({
    name: "headers",
    type: "json",
  })
  headers!: HeadersParamsInterface[];

  @Column({
    name: "authorization",
    type: "json",
  })
  authorization!: HeadersParamsInterface[];

  @Column({
    name: "parameters",
    type: "json",
  })
  parameters!: any;

  @Column({
    name: "response",
    type: "json",
    nullable: true,
  })
  response!: any;

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

  @OneToMany(() => EndpointEnv, (endpointEnv) => endpointEnv.endpoint)
  endpointEnv!: EndpointEnv[];

  @OneToMany(() => EndpointVersion, (endpointEnv) => endpointEnv.endpoint)
  endpointVersion!: EndpointVersion[];
}
