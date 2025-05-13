import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UsersRepository } from "./user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserService, UsersRepository],
    exports: [UsersRepository]
  })
  export class UsersModule {}