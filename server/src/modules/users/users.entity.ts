import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    //don't need constructor here
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date
}