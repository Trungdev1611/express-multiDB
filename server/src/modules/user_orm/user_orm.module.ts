import { Module } from '@nestjs/common';
import { UserOrmController } from './user_orm.controller';
import { UserOrmService } from './user_orm.service';
import { UserOrmRepository } from './user_orm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrm } from './user_orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrm])],
  controllers: [UserOrmController],
  providers: [UserOrmService, UserOrmRepository],
  exports: []
})
export class UserOrmModule {}