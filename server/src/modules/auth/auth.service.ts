import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../users/users.entity";
import { UsersRepository } from "../users/user.repository";
import { loginDTO } from "./dto/loginDTO";
import { CustomException } from "src/common/customException/CustomException";

@Injectable()
export class AuthService {
  constructor (
    private userRepository: UsersRepository )
    {

    }

    async login(loginData: loginDTO) {
      const user = await this.userRepository.findByEmailAndPass(loginData)
      if(!user) {
        return new CustomException("user login is not found")
      }
      return user.email
    }
 
}