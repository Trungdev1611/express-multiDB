import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => CommentEntity, (comment) => comment.childrenComment)
    parentComment: CommentEntity

    @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
    childrenComment: CommentEntity[]
}
