import { Injectable } from '@nestjs/common';
import { PositionRepoSitory } from './position.repository';
import { SearchPositionDTO } from './dto/SearchPosition.dto';
;
// import { CreateDto } from './dto/create-.dto';
// import { UpdateDto } from './dto/update-.dto';
@Injectable()
export class PositionService {
    constructor(private positionRepository: PositionRepoSitory) {

    }
//   create(createDto: CreateDto) {
//     return 'This action adds a new ';
//   }

 async findAll(searchPositionDTO: SearchPositionDTO) {
    return await  this.positionRepository.findAll(searchPositionDTO)
  }

  async findOne(id: number):Promise<any> {
    return await this.positionRepository.findDetailWithUsers(id);
  }

//   update(id: number, updateDto: UpdateDto) {
//     return `This action updates a #id `;
//   }

//   remove(id: number) {
//     return `This action removes a #id `;
//   }
}
