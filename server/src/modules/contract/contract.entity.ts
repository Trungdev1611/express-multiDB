// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseTimeEntity } from '../Base/BaseTime.entity';
import { Users } from '../users/users.entity';

@Entity()
export class ContractEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numberCode: string;

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
