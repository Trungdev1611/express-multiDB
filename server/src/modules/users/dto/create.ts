import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRole } from '../users.entity';

export class UserCreateDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}
export type UpdateUserDTO = Partial<UserCreateDTO>;
