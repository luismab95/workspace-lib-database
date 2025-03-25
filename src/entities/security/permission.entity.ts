import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { UserPermission } from "./user-permission.entity";
import { Entities } from "./entity.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";

export interface ResourcesPermissionInterface {
  version: string;
  statement: StatementInterface[];
}

export interface StatementInterface {
  effect: "Allow" | "Denny";
  action: string[];
  resource: string[];
}

@Entity({ name: "permission", schema: "security" })
export class Permission {
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
    name: "description",
    type: "varchar",
    length: 255,
  })
  description!: string;

  @Index({ unique: true })
  @Column({
    name: "name",
    type: "varchar",
    unique: true,
    length: 100,
  })
  name!: string;

  @Column({
    name: "resources",
    type: "json",
    nullable: false,
  })
  resources!: ResourcesPermissionInterface;

  @Column({
    name: "entity_id",
    type: "int",
    nullable: true,
  })
  entityId!: number;

  @Column({
    name: "system",
    type: "boolean",
    nullable: false,
    default: false,
  })
  system!: boolean;

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

  @OneToMany(
    () => UserPermission,
    (UserPermission) => UserPermission.permission
  )
  userPermission!: UserPermission[];

  @ManyToOne(() => Entities, (entity) => entity.permission)
  @JoinColumn({ name: "entity_id" })
  entity!: Entities;
}
