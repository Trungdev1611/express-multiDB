import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/users.entity';

export enum STATUS_ATTENDANCE {
    NOT_ENOUGH_HOURS = "not_enough",
    ENOUGH_TIME = "enough",
    ABSENT = "absent",
}


@Entity()
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  checkIn: Date;

  @Column({nullable: true})
  checkOut: Date

  @ManyToOne(() => Users, user => user.attendances, {onDelete: "CASCADE"})
  user: Users

  @Column({
    type: "enum",
    enum: STATUS_ATTENDANCE,
    default: STATUS_ATTENDANCE.ABSENT,
})
  status: STATUS_ATTENDANCE


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}