import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { ResourceAction } from "./resource-action.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";
import { stringToSlug } from "../../shared/helpers/string.helper";

@Entity({ name: "resource", schema: "security" })
export class Resource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({
    name: "uuid",
    type: "varchar",
    unique: true,
    nullable: false,
  })
  uuid!: string;

  @BeforeInsert()
  randonCode() {
    this.uuid =
      randomCharacters("COMBINED", 8).toUpperCase() +
      "-" +
      stringToSlug(this.name);
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

  @OneToMany(() => ResourceAction, (resourceAction) => resourceAction.resource)
  resourceAction!: ResourceAction[];
}
