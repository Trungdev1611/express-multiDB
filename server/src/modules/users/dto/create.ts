import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { UserRole } from '../users.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserCreateDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional()
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional()
  @IsNumber()
  departmentId: number

   @ApiPropertyOptional()
  @IsNumber()
  contractId: number
}
export type UpdateUserDTO = Partial<UserCreateDTO>;
