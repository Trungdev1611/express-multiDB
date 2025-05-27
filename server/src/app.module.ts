import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './database/data-source';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartModule } from './modules/department/department.module';
import { PositionModule } from './modules/position/Position.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule, AuthModule, DepartModule, PositionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
