import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DepartmentEntity } from '../department/Department.entity';
import { PositionEntity } from '../position/Position.entity';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { AttendanceEntity } from '../attendance/attendance.entity';
import { ContractEntity } from '../contract/contract.entity';

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
  @Exclude()
  @ApiHideProperty()
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

  @OneToMany(() => AttendanceEntity, attendance => attendance.user)
  attendances: AttendanceEntity[]

  @OneToOne(() => ContractEntity, contract => contract.user)
  contract: ContractEntity


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
