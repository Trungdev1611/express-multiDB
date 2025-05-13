import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwtStrategy';
import { DATA_CONSTANT } from 'src/constants';

//tạo module riêng thay vì trong auth module
@Module({
  imports: [PassportModule,  JwtModule.register({
    secret: DATA_CONSTANT.jwt_scret, 
    signOptions: { expiresIn: '1d' }, // hoặc '3600s'
  }),],
  controllers: [],
  providers: [JwtStrategy],
  exports: [JwtModule]
})
export class JSONwebtokenmodule {}