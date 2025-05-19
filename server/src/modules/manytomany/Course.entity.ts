import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name_course: string

    @Column()
    price: number

    @ManyToMany(() => Student, (student) => student.courses)
    students: Student[]

    @CreateDateColumn()
    created_at: Date


}