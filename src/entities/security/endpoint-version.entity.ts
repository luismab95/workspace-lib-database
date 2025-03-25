import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Endpoint } from "./endpoint.entity";

@Unique(["version", "endpointId"])
@Entity({ name: "endpoint-version", schema: "security" })
export class EndpointVersion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: "version",
    type: "varchar",
    nullable: false,
  })
  version!: string;

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
    name: "endpoint_id",
    type: "int",
    nullable: false,
  })
  endpointId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => Endpoint, (endpoint) => endpoint.endpointVersion)
  @JoinColumn({ name: "endpoint_id" })
  endpoint!: Endpoint;
}
