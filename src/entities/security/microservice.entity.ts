import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { randomCharacters } from "../../shared/helpers/random.helper";

@Entity({ name: "microservice", schema: "security" })
export class Microservice {
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
    name: "path",
    type: "varchar",
  })
  path!: string;

  @Column({
    name: "url",
    type: "varchar",
  })
  url!: string;

  @Column({
    name: "white_list",
    type: "json",
  })
  whiteListPermission!: string[];

  @Column({
    name: "origins",
    type: "json",
  })
  origins!: string[];

  @Column({
    name: "middlewares",
    type: "json",
    nullable: true,
  })
  middlewares!: string[];

  @Column({
    name: "status",
    type: "boolean",
    nullable: false,
    default: true,
  })
  status!: boolean;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;
}
