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
import { Role } from "./role.entity";
import { Entities } from "./entity.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";

@Entity({ name: "user_type", schema: "security" })
export class UserType {
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
    nullable: false,
  })
  description!: string;

  @Column({
    name: "login_url",
    type: "varchar",
    nullable: false,
  })
  loginUrl!: string;

  @Column({
    name: "auth_background",
    type: "varchar",
    nullable: true,
  })
  authBackground!: string;

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

  @OneToMany(() => Role, (role) => role.userType)
  role!: Role[];

  @OneToMany(() => Entities, (entity) => entity.userType)
  entity!: Entities[];
}
