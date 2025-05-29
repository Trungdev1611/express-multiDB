import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UsersRepository } from "./user.repository";
import { ContractRepository } from "../contract/contract.repository";
import { DepartmentRepo } from "../department/department.repository";
import { DepartModule } from "../department/department.module";
import { ContractModule } from "../contract/contract.module";

@Module({
    imports: [TypeOrmModule.forFeature([Users]), DepartModule, ContractModule],
    controllers: [UserController],
    providers: [UserService, UsersRepository],
    exports: [UsersRepository]
  })
  export class UsersModule {}