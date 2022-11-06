import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from '../dto/pagination.dot';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private userServices: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() pagination: PaginationDto) {
    const { search = '' } = pagination;
    if (!!search.trim()) {
      const builder = await this.userServices.queryBuilder('users');
      builder.where('users.email LIKE :s OR users.username LIKE :s', {
        s: `%${search}%`,
      });
      return await builder.getMany();
    }
    return this.userServices.findAll(pagination);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.userServices.findOne(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userServices.create(body);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userServices.update(id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userServices.delete(id);
  }
}
