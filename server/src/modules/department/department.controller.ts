import {
  Controller,
  Get,
} from '@nestjs/common';

import { DepartService } from './department.service';

@Controller('v1/department')
export class DepartController {
  constructor(private readonly departService: DepartService) {}

  @Get()
  findAll() {
    return this.departService.findAll();
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
