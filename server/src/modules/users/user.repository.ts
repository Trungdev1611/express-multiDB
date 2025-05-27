import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './users.entity';
import { loginDTO } from '../auth/dto/loginDTO';
import * as dayjs from 'dayjs';

@Injectable()
export class UsersRepository {
  private readonly repo: Repository<Users>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Users);
  }

  async findAllAndCount(page: number, limit: number, positionId: number | undefined): Promise<[Users[], number]> {
    // return this.repo.findAndCount({
    //   skip: (page - 1) * limit,
    //   take: limit,
    // });
    const queryBuilder = this.repo.createQueryBuilder("user")
      if(positionId) {
        queryBuilder.leftJoinAndSelect("user.position", "position").where("position.id =:positionId", {positionId})
      }
      queryBuilder.skip((page - 1) * limit)
      .take(limit)
      return await queryBuilder.getManyAndCount()
  }

  async findOne(idUser: number, date?: Date): Promise<Users | null> {
    // return this.repo.findOne({
    //   where: { id: idUser },
    //   relations: {
    //     department: true,
    //     position: true,
    //     attendances: true
    //   }
    // });

    const queryBuilder = this.repo.createQueryBuilder("user")
      .leftJoinAndSelect("user.department", "department")
      .leftJoinAndSelect("user.position", "position")
      .leftJoinAndSelect("user.attendances", "attendances")
      .leftJoinAndSelect("user.contract", "contract")
      .where("user.id =:id", { id: idUser })
    if (date) {
      queryBuilder.andWhere("EXTRACT(MONTH FROM attendances.created_at) = :month", { month: dayjs(date).month() })
        .andWhere("EXTRACT(YEAR FROM attendances.created_at) = :year", { year: dayjs(date).year() })
    }
    return await queryBuilder.getOne()
  }

  async findByEmailAndPass(loginData: loginDTO) {
    return this.repo.findOne({
      where: {
        email: loginData.email,
        password: loginData.password
      }
    })
  }

  create(userData: Partial<Users>) {
    return this.repo.create(userData);
  }

  async save(userData: Users): Promise<Users> {
    return this.repo.save(userData);
  }

  async delete(user: Users): Promise<void> {
    await this.repo.delete(user);
  }
}
