import { Injectable, NotFoundException } from '@nestjs/common';
import { UserOrmRepository } from './user_orm.repository';
import { CreateUserDto } from './dto/createUser.dto';


@Injectable()
export class UserOrmService {
  constructor( private userOrmRepo: UserOrmRepository) {
   
  }
  create(data: CreateUserDto) {
    return this.userOrmRepo.saveToDB(data)
  }

  findAll() {
    return this.userOrmRepo.findAll();
  }
  async findAllWithItemSoftDelete() {
    return await this.userOrmRepo.findAllWithSoftDelete()
  }

  findOne(id: number) {
    return `This action returns a #id `;
  }

  async findOneBy(firstname: string, lastname: string) {
    const user = await this.userOrmRepo.findOneBy(firstname, lastname)
    console.log(`usser`, user, firstname, lastname)
    if(!user) {
      return new NotFoundException(`cannot find user`)
    }
    return user
  }

  // update(id: number, updateDto: UpdateDto) {
  //   return `This action updates a #id `;
  // }

  remove(id: number) {
    return this.userOrmRepo.softDeleteOrm(id)
  }

   delete(id: number) {
    return this.userOrmRepo.hardDelete(id)
  }
}
