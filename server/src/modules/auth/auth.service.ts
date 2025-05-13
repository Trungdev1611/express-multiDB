import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/user.repository";
import { loginDTO } from "./dto/loginDTO";
import { CustomException } from "src/common/customException/CustomException";
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor (
    private userRepository: UsersRepository,
    private jwtService: JwtService
  ){}

    async login(loginData: loginDTO) {
      const user = await this.userRepository.findByEmailAndPass(loginData)
      if(!user) {
        return new CustomException("user login is not found")
      }

      //create payload jwt
      const payload = {emailUser: user.email, id: user.id}
      return {
        access_token:  this.jwtService.sign(payload),
      };
    }
 
}