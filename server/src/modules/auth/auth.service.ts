import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../users/users.entity";

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(Users)
    private userRepository: Repository<Users> )
    {

    }

    async login() {
      return
    }
 
}