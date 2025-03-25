import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Entities } from "./entity.entity";

@Entity({ name: "parameter", schema: "security" })
export class Parameter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({
    name: "code",
    type: "varchar",
    unique: true,
    length: 100,
    nullable: false,
  })
  code!: string;

  @Column({
    name: "name",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name!: string;

  @Column({
    name: "description",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  description!: string;

  @Column({
    name: "value",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  value!: string;

  @Column({
    name: "protected",
    type: "boolean",
    nullable: false,
    default: false,
  })
  protected!: boolean;

  @Column({
    name: "private",
    type: "boolean",
    nullable: false,
    default: false,
  })
  private!: boolean;

  @Column({
    name: "entity_id",
    type: "int",
    nullable: false,
  })
  entityId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @ManyToOne(() => Entities, (entity) => entity.parameter)
  @JoinColumn({ name: "entity_id" })
  entity!: Entities;
}
