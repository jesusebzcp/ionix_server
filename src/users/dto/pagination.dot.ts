import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset: number;
  @IsString()
  @IsOptional()
  order: 'asc' | 'desc';
  @IsString()
  @IsOptional()
  search: string;
}
