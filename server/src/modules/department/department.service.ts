import { Injectable } from '@nestjs/common';
import { DepartmentRepo } from './department.repository';
// import { CreateDto } from './dto/create-.dto';
// import { UpdateDto } from './dto/update-.dto';

@Injectable()
export class DepartService {
    constructor(private departRepo: DepartmentRepo) {

    }
//   create(createDto: CreateDto) {
//     return 'This action adds a new ';
//   }

  findAll() {
    return this.departRepo.findAll();
  }

//   findOne(id: number) {
//     return `This action returns a #id `;
//   }

//   update(id: number, updateDto: UpdateDto) {
//     return `This action updates a #id `;
//   }

//   remove(id: number) {
//     return `This action removes a #id `;
//   }
}
