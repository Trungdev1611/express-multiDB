import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JSONwebtokenmodule } from './jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UsersModule,
    JSONwebtokenmodule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: []
})
export class AuthModule {}