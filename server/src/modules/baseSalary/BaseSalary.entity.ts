import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseTimeEntity } from '../Base/BaseTime.entity';
import { Users } from '../users/users.entity';
import { PositionEntity } from '../position/Position.entity';

@Entity()
export class BaseSalaryEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PositionEntity, position => position.base_salary)
  position: PositionEntity;

  @Column({type: 'decimal', name: "salary_month",precision: 15, scale: 2})
  salaryMonth: string

  @Column()
  description: string

  @Column({ type: 'enum', enum: ['active', 'expired', 'terminated'], default: 'active' })
  status: string

  @OneToOne(() => Users, user => user.contract, {onDelete: "CASCADE"})
  @JoinColumn()
  user: Users


}
