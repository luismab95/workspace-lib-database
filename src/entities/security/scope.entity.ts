import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { randomCharacters } from "../../shared/helpers/random.helper";

@Entity({ name: "scope", schema: "security" })
export class Scope {
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

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    length: 100,
  })
  name!: string;

  @Column({
    name: "description",
    type: "varchar",
    nullable: false,
  })
  description!: string;

  @Column({
    name: "condition",
    type: "varchar",
    nullable: true,
  })
  condition!: string;

  @Column({
    name: "table_name",
    type: "varchar",
    nullable: true,
  })
  tableName!: string;

  @Column({
    name: "column",
    type: "varchar",
    nullable: true,
  })
  column!: string;

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
}
