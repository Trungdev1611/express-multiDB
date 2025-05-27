import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { DepartService } from './department.service';
import { FilterDepartmentDTO } from './dto/FilterDepartmentDTO';
import { BaseDTO } from '../Base/BaseDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("department")
@Controller('v1/department')
export class DepartController extends BaseDTO{
  constructor(private readonly departService: DepartService) {
    super()
  }

  @Get()
 async findAll(@Query() filterDTO: FilterDepartmentDTO) {
    const [data, total] = await this.departService.findAll(filterDTO);
    return this.pagination(data, total)
  }

  @Get("detail/:id")
 async findDetail(@Param('id') id: number) {
    const data = await this.departService.getDetail(id);
    return this.successResponse(data)
  }
  
//   @Post()
//   create(@Body() createDto: CreateDto) {
//     return this.departService.create(createDto);
//   }


//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.departService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
//     return this.departService.update(+id, updateDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.departService.remove(+id);
//   }
}
