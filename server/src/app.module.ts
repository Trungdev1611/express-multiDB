import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './database/data-source';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserOrmModule } from './modules/user_orm/user_orm.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule, AuthModule, UserOrmModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
