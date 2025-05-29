import { Injectable } from "@nestjs/common";
import { UpdateUserDTO, UserCreateDTO } from "./dto/create";
import { CustomException } from "src/common/customException/CustomException";
import { UsersRepository } from "./user.repository";
import { DepartmentRepo } from "../department/department.repository";
import { ContractRepository } from "../contract/contract.repository";

@Injectable()
export class UserService {
constructor(
        private userRepository: UsersRepository,
         private departRepo: DepartmentRepo,
         private contractRepo: ContractRepository
    ) {
       
        }
       async findAll(page: number, limit: number, positionId: number) {
         //getAll là find() còn findAndCount là phân trang và tính tổng
            return await this.userRepository.findAllAndCount(page, limit, positionId)
            
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
            if(userData.contractId) {
               const contract = await this.contractRepo.findOneById(userData.contractId)
                if(contract) {
                    user.contract = contract
                }
                else {
                    throw new CustomException("contract is not found")
                }
            }

            if(userData.departmentId) {
                    const department = await this.departRepo.findOneById(userData.departmentId)
                if(department) {
                    user.department = department
                }
                else {
                    throw new CustomException("department is not found")
                }
            }
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
            await this.userRepository.delete(idUser)
            return null
        }
}
