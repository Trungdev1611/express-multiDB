import { Injectable } from '@nestjs/common';
import { DepartmentRepo } from './department.repository';
// import { DataSource } from 'typeorm';
import { FilterDepartmentDTO } from './dto/FilterDepartmentDTO';

// import { CreateDto } from './dto/create-.dto';
// import { UpdateDto } from './dto/update-.dto';

@Injectable()
export class DepartService {
    constructor(
        private departRepo: DepartmentRepo,
        // dataSource: DataSource
    ) {

    }
//   create(createDto: CreateDto) {
//     return 'This action adds a new ';
//   }

 async findAll(filter: FilterDepartmentDTO) {
    return await this.departRepo.findAll(filter)
    
  }

  async getDetail(id: number) {
    return await this.departRepo.findOne(id);
  }

//   update(id: number, updateDto: UpdateDto) {
//     return `This action updates a #id `;
//   }

//   remove(id: number) {
//     return `This action removes a #id `;
//   }
}
