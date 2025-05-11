import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './users.entity';
import { loginDTO } from '../auth/dto/loginDTO';

@Injectable()
export class UsersRepository {
  private readonly repo: Repository<Users>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Users);
  }

  async findAllAndCount(page: number, limit: number): Promise<[Users[], number]> {
    return this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(idUser: number): Promise<Users | null> {
    return this.repo.findOne({
      where: { id: idUser },
    });
  }

  async findByEmailAndPass(loginData: loginDTO) {
    return this.repo.findOne({
      where: {
        email: loginData.email,
        password: loginData.password
      }
    })
  }

  async create(userData: Partial<Users>) {
    return this.repo.create(userData);
  }

  async save(userData: Users): Promise<Users> {
    return this.repo.save(userData);
  }

  async delete(user: Users): Promise<void> {
    await this.repo.delete(user);
  }
}
