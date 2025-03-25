import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Entities } from "./entity.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";

@Entity({ name: "user_type_login", schema: "security" })
export class UserTypeLogin {
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
    name: "alias",
    type: "varchar",
    unique: true,
    length: 8,
    nullable: false,
  })
  alias!: string;

  @Index({ unique: true })
  @Column({
    name: "name",
    type: "varchar",
    unique: true,
    length: 100,
    nullable: false,
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

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @OneToMany(() => Entities, (entity) => entity.userTypeLogin)
  entity!: Entities[];
}
