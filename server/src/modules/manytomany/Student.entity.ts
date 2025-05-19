import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./Course.entity";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name_course: string

    @Column()
    price: number

    @ManyToMany(() => Course, (course) => course.students)
    @JoinTable() //many to many need specific JoinTable in one side
    courses: Course[]

    @CreateDateColumn()
    created_at: Date


}