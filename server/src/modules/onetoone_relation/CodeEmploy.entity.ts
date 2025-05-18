import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class CodeEmployee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  size: number

  @OneToOne(() => Employee, (code) => code.code_employee)
  @JoinColumn()
  employee: Employee
}