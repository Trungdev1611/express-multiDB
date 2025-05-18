import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { TaskEntity } from "../tasks/Task.entity"

@Entity()
export class UserOrm {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean

    @Column("text", {array: true, default: () => "'{}'", nullable: false})
    items: string []

    @OneToMany(() => TaskEntity, (task) => task.userOrm, {
        cascade: ['insert', 'remove']
    })
    tasks: TaskEntity

    @CreateDateColumn()
    created_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}