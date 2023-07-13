import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn
} from "typeorm";
import { Permission } from "../../permissions/entities/permission.entity";


@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @ManyToMany(() => Permission, {cascade: true})
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {name: 'role_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
  })
  permissions: Permission[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}