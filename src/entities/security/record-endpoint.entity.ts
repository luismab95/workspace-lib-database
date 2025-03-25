import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EndpointEnv } from "./endpoint-env.entity";

@Entity({ name: "record-endpoint-env", schema: "security" })
export class RecordEndpointEnv {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "status_text",
    type: "varchar",
    nullable: false,
  })
  statusText!: string;

  @Column({
    name: "version",
    type: "varchar",
    nullable: false,
  })
  version!: string;

  @Column({
    name: "status_code",
    type: "varchar",
    nullable: false,
  })
  statusCode!: string;

  @Column({
    name: "endpoint_env_id",
    type: "int",
    nullable: false,
  })
  endpointEnvId!: number;

  @Column({
    name: "time",
    type: "varchar",
    nullable: false,
  })
  time!: string;

  @Column({
    name: "size",
    type: "varchar",
    nullable: false,
  })
  size!: string;

  @Column({
    name: "response",
    type: "varchar",
    nullable: false,
  })
  response!: string;

  @Column({
    name: "payload",
    type: "varchar",
    nullable: false,
  })
  payload!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @ManyToOne(() => EndpointEnv, (endpointEnv) => endpointEnv.recordEndpointEnv)
  @JoinColumn({ name: "endpoint_env_id" })
  endpointEnv!: EndpointEnv;
}
