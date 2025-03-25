import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { Resource } from "./resource.entity";
import { MenuAction } from "./menu-action.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";
import { stringToSlug } from "../../shared/helpers/string.helper";

@Entity({ name: "resource_action", schema: "security" })
export class ResourceAction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({
    name: "uuid",
    type: "varchar",
    unique: true,
    nullable: true,
  })
  uuid!: string;

  @BeforeInsert()
  randonCode() {
    this.uuid =
      randomCharacters("COMBINED", 8).toUpperCase() +
      "-" +
      stringToSlug(this.name);
  }

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
    name: "method",
    type: "varchar",
    length: 30,
    nullable: false,
  })
  method!: string;

  @Column({
    name: "url",
    type: "varchar",
    nullable: false,
  })
  url!: string;

  @Column({
    name: "resource_id",
    type: "int",
    nullable: false,
  })
  resourceId!: number;

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

  @ManyToOne(() => Resource, (resource) => resource.resourceAction)
  @JoinColumn({ name: "resource_id" })
  resource!: Resource;

  @OneToMany(() => MenuAction, (menuAction) => menuAction.resourceAction)
  resourceAction!: MenuAction[];
}
