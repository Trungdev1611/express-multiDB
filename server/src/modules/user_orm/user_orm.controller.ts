import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserOrmService } from './user_orm.service';
import { findUsernameDTO } from './dto/findUsername.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user-orm')
export class UserOrmController {
  constructor(private readonly userOrmService: UserOrmService) {}

  @Post(`create-new`)
  create(@Body() createDto: CreateUserDto) {
    console.log(`createDto`, createDto)
    return this.userOrmService.create(createDto);
  }

  @Get()
  findAll() {
    return this.userOrmService.findAll();
  }


  @Get('find-all-soft-delete')
  findAllWithSoftDelete(){
     return this.userOrmService.findAllWithItemSoftDelete();
  }
 @Get('findusername')
 async findByName(
    @Query() query: findUsernameDTO
  ) {
    return await this.userOrmService.findOneBy(query.firstname, query.lastname);
  }
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.userOrmService.findOne(+id);
  }

  @Post('create_new')
  async createUser(@Body() data:CreateUserDto ) {

  }
 

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
  //   return this.sService.update(+id, updateDto);
  // }

  @Delete('softdelete/:id')
  remove(@Param('id') id: number) {
    return this.userOrmService.remove(id);
  }
    @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.userOrmService.delete(id);
  }

  //onetoone
  @Get('employee_and_code')
  getEmployeeOnetoOne() {
    return this.userOrmService.getEmployeeAndCode()
  }
}
