import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @Length(6)
  password: string;
}
