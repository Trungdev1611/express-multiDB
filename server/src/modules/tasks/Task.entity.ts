import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { UserOrm } from "../user_orm/user_orm.entity"

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    is_finish: boolean

    @ManyToOne(() => UserOrm, (userorm) => userorm.tasks, {onDelete: 'CASCADE'})
    userOrm: UserOrm

    @CreateDateColumn()
    created_at: Date

}