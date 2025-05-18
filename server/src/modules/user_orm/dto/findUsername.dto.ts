import { IsNotEmpty, IsString } from 'class-validator';

export class findUsernameDTO {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;
}
