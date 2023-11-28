import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  first_name?: string;

  last_name?: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  role_id: number;
}
