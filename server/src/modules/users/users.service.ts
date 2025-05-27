import { Injectable } from "@nestjs/common";
import { UpdateUserDTO, UserCreateDTO } from "./dto/create";
import { CustomException } from "src/common/customException/CustomException";
import { UsersRepository } from "./user.repository";

@Injectable()
export class UserService {
constructor(
        private userRepository: UsersRepository) {

        }
       async findAll(page: number, limit: number) {
         //getAll là find() còn findAndCount là phân trang và tính tổng
            return await this.userRepository.findAllAndCount(page, limit)
            
        }

        async findOne(idUser: number, dateareaName?: Date) {
            const user =  await this.userRepository.findOne(idUser, dateareaName)
            if(!user) {
                throw new CustomException(`user is not found with id: ${idUser}`, 404)
            }
            return user
        }

        async createNew(userData: UserCreateDTO) {
            const user =  this.userRepository.create(userData)
            return await this.userRepository.save(user)
        }

        async editUser(idUser: number, userData:UpdateUserDTO ) {
            if(Object.values(userData)?.length < 1) {
                throw new CustomException(`data update cannot be empty`)
            }
            const user =await  this.findOne(idUser)
            return this.userRepository.save({...user, ...userData})
        }

        async deleteUser(idUser: number) {
            const user =await  this.findOne(idUser)
            await this.userRepository.delete(user)
            return null
        }
}
