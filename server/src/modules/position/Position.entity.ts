import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { Users } from '../users/users.entity';
import { BaseSalaryEntity } from '../baseSalary/BaseSalary.entity';

@Entity()
export class PositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Users, user => user.position, {onDelete: 'CASCADE'})
  users: Users[]

  @OneToOne(() => BaseSalaryEntity, (base_salary) => base_salary.position)
  base_salary: BaseSalaryEntity
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}