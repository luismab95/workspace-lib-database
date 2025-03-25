import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Endpoint } from "./endpoint.entity";
import { RecordEndpointEnv } from "./record-endpoint.entity";

@Unique(["tag", "endpointId"])
@Entity({ name: "endpoint-env", schema: "security" })
export class EndpointEnv {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "tag",
    type: "varchar",
    length: 8,
    nullable: false,
  })
  tag!: string;

  @Column({
    name: "url",
    type: "varchar",
    nullable: false,
  })
  url!: string;

  @Column({
    name: "status",
    type: "boolean",
    nullable: false,
    default: true,
  })
  status!: boolean;

  @Column({
    name: "endpoint_id",
    type: "int",
    nullable: false,
  })
  endpointId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => Endpoint, (endpoint) => endpoint.endpointEnv)
  @JoinColumn({ name: "endpoint_id" })
  endpoint!: Endpoint;

  @OneToMany(
    () => RecordEndpointEnv,
    (recordEndpointEnv) => recordEndpointEnv.endpointEnv
  )
  recordEndpointEnv!: RecordEndpointEnv[];
}
