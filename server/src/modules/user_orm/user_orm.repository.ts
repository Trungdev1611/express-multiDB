import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrm } from './user_orm.entity';
import { CreateUserDto } from './dto/createUser.dto';

// From TypeORM v0.3
// Injectable decorator marks this class as a provider to be injected into other classes
@Injectable()
export class UserOrmRepository {
  // Injecting the repository for the entity into the class
  constructor(
    @InjectRepository(UserOrm)
    private readonly repo: Repository<UserOrm>,
  ) {}

  // Method to find all entities of type EntityName
  async findAll() {
    // Using TypeORM's find method to fetch all records of the entity
    return this.repo.findAndCount();
  }

  async findAllWithSoftDelete() {
    return await this.repo.findAndCount({ withDeleted: true });
  }

  async saveToDB(data: CreateUserDto) {
    return await this.repo.save(data);
  }

  async findOneBy(firstName: string, lastName: string) {
    return this.repo.findOneBy({
      firstName: firstName,
      lastName: lastName,
    });
  }

  async softDeleteOrm(id: number) {
    return this.repo.softDelete(id);
  }
  async hardDelete(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['tasks'], // load quan hệ để cascade hoạt động
    });

    if (!user) throw new Error('User not found');
    return this.repo.remove(user);
  }
}
