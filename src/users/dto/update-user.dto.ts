import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstname: string;
  @ApiProperty()
  @IsString()
  lastname: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  imageUrl: string;
}
