import {
  Controller,
  Get,
  Param,
  Query,

} from '@nestjs/common';
import { PositionService } from './position.service';
import { ApiTags } from '@nestjs/swagger';
import { BaseDTO } from '../Base/BaseDTO';
import { SearchPositionDTO } from './dto/SearchPosition.dto';

@ApiTags("Position")
@Controller('position')
export class PositionController extends BaseDTO{
  constructor(private readonly positionService: PositionService) {
    super()
  }

//   @Post()
//   create(@Body() createDto: CreateDto) {
//     return this.sService.create(createDto);
//   }

  @Get()
  async findAll(@Query() query: SearchPositionDTO) {
    const [data, count] =  await this.positionService.findAll(query);
    return this.pagination(data, count)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.positionService.findOne(+id);
    return this.successResponse(data)
  }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
//     return this.sService.update(+id, updateDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.sService.remove(+id);
//   }
}
