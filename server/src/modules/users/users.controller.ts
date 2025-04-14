import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { UpdateUserDTO, UserCreateDTO } from "./dto/create";

@Controller("users")
export class UserController {
    constructor(private userService: UserService){}

    @Get("getlist")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getList(@Req() request: Request) {
        return await this.userService.findAll()
    }

    @Get(`details/:id`)
    async getDetail(@Param('id') id:number) {
        return await this.userService.findOne(id)
    }

    @Post("create-new")
    async createUser(@Body() userCreated: UserCreateDTO) {
        return await this.userService.createNew(userCreated)
    }


    @Patch(`update/:id`)
    async update(@Param(`id`) id:number, @Body() updateData: UpdateUserDTO ) {
        return await this.userService.editUser(id, updateData)
    }

    @Delete('delete/:id')
    async delete(@Param(`id`) id:number) {
        return await this.userService.deleteUser(id)
    }

    
}