import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
export type UpdateUserDTO = Partial<UserCreateDTO>;
