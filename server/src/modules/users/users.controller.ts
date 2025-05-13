import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDTO, UserCreateDTO } from './dto/create';
import { BaseDTO } from '../Base/BaseDTO';
//add authGuard để sử dụng jwt
import { AuthGuard } from '@nestjs/passport';
@Controller('v1/users')
@UseGuards(AuthGuard('jwt')) 
export class UserController extends BaseDTO {
  //extends ở đây để chuẩn hoá response
  constructor(private userService: UserService) {
    super(); //extends bắt buộc gọi super từ cha
  }

  @Get('getlist')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getList(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const [data, total] = await this.userService.findAll(page, limit);
    return super.pagination(data, total);
  }

  @Get(`details/:id`)
  async getDetail(@Param('id') id: number) {
    return super.successResponse(await this.userService.findOne(id));
  }

  @Post('create-new')
  async createUser(@Body() userCreated: UserCreateDTO) {
    return super.successResponse(await this.userService.createNew(userCreated));
  }

  @Patch(`update/:id`)
  async update(@Param(`id`) id: number, @Body() updateData: UpdateUserDTO) {
    return super.successResponse(
      await this.userService.editUser(id, updateData),
    );
  }

  @Delete('delete/:id')
  async delete(@Param(`id`) id: number) {
    return super.successResponse(await this.userService.deleteUser(id));
  }
}
