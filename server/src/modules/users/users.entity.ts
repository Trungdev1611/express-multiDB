import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { DepartmentEntity } from '../department/Department.entity';
import { PositionEntity } from '../position/Position.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  AREA_MANAGER = "area_manager"

}


@Entity()
export class Users {
  //don't need constructor here
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => DepartmentEntity, department => department.users)
  department: DepartmentEntity

  @ManyToOne(() => PositionEntity, position => position.users)
  position: PositionEntity

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
