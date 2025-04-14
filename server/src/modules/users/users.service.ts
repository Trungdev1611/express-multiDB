import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { UpdateUserDTO, UserCreateDTO } from "./dto/create";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>) {

        }
       async findAll() {
            return await this.userRepository.find() //getAll
        }

        async findOne(idUser: number) {
            const user =  await this.userRepository.findOne({
                where: {id: idUser}
            })
            if(!user) {
                throw new BadRequestException(`user is not found with id: ${idUser}`)
            }
            return user
        }

        async createNew(userData: UserCreateDTO) {
            const user = this.userRepository.create({...userData, created_at: new Date(), updated_at: new Date()})
            return await this.userRepository.save(user)
        }

        async editUser(idUser: number, userData:UpdateUserDTO ) {
            if(Object.values(userData)?.length < 1) {
                throw new BadRequestException(`data update cannot be empty`)
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