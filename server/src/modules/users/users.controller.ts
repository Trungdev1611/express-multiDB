import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { RolesGuard } from 'src/common/guards/RoleGuard';
import { Roles } from 'src/common/decorators/Role.decorator';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchUserDto } from './dto/SearchUserDTO';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('v1/users')
// @UseGuards(AuthGuard('jwt')) 
export class UserController extends BaseDTO {
  //extends ở đây để chuẩn hoá response
  constructor(private userService: UserService) {
    super(); //extends bắt buộc gọi super từ cha
  }

  @Get('getlist')
  @ApiOperation({ summary: 'Api để get list user',
     description: `
      - user có liên kết với contract 1-1
      - user có liên kết với chấm công 1-n
      - user có liên kết với position n-1
      - user có liên kết với department n- 1
    ` })
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getList(
    @Query() searchDTO: SearchUserDto
  ) {
    const { page = 1, pageSize = 10, positionId } = searchDTO;
    const [data, total] = await this.userService.findAll(page, pageSize, +positionId);
    return super.pagination(data, total);
  }

  @Get(`details/:id`)
  async getDetail(@Param('id') id: number, @Query("date") date ) {
    return super.successResponse(await this.userService.findOne(id, date));
  }

  @Post('create-new')
  //  @ApiBody({
  //   schema: {
  //     example: {
  //       username: 'John Doe', 
  //       email: 'john@example.com',
  //       password: 'test',
  //       role: "area_manager"
  //     },
  //   },
  // })
  async createUser(@Body() userCreated: UserCreateDTO) {
    return super.successResponse(await this.userService.createNew(userCreated));
  }

  @Patch(`update/:id`)
  @ApiBody({ type: UserCreateDTO })
  async update(@Param(`id`) id: number, @Body() updateData: UpdateUserDTO) {
    return super.successResponse(
      await this.userService.editUser(id, updateData),
    );
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard) //phải đính kèm dòng này khi dùng phân quyền
  @Roles("admin") //chỉ cho phép admin xoá
  @Delete('delete/:id')
  async delete(@Param(`id`) id: number) {
    return super.successResponse(await this.userService.deleteUser(id));
  }
}
