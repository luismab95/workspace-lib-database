import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { UserRole } from "./user-role.entity";
import { UserType } from "./user_type.entity";
import { randomCharacters } from "../../shared/helpers/random.helper";

@Entity({ name: "role", schema: "security" })
export class Role {
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

  @Column({
    name: "system",
    type: "boolean",
    nullable: false,
    default: false,
  })
  system!: boolean;

  @Column({
    name: "user_type_id",
    type: "int",
    nullable: false,
  })
  userTypeId!: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  updatedAt!: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  role!: UserRole[];

  @ManyToOne(() => UserType, (userType) => userType.role)
  @JoinColumn({ name: "user_type_id" })
  userType!: UserType;
}
