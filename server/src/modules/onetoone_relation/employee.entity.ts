import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodeEmployee } from "./CodeEmploy.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string


  @OneToOne(() => CodeEmployee, (code_employee) => code_employee.employee)
  code_employee: CodeEmployee
}