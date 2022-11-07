import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from '../dto/pagination.dot';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAll({ limit = 10, offset = 1, order }: PaginationDto): Promise<User[]> {
    return this.userRepo.find({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        username: true,
        password: false,
        createAt: true,
        imageUrl: true,
      },
      skip: offset,
      take: limit,
      order: {
        createAt: order === 'asc' ? -1 : 1,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return new HttpException('User no found', HttpStatus.CONFLICT);
    }
    return user;
  }

  async create(body: CreateUserDto) {
    const findUserEmail = await this.userRepo.findOne({
      where: {
        email: body.email,
      },
    });

    if (findUserEmail) {
      return new HttpException(
        'the mail is already in use',
        HttpStatus.CONFLICT,
      );
    }
    const findUserUsername = await this.userRepo.findOne({
      where: {
        username: body.username,
      },
    });
    if (findUserUsername) {
      return new HttpException(
        'the username already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = this.userRepo.create(body);
    return await this.userRepo.save(newUser);
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return new HttpException('User no found', HttpStatus.CONFLICT);
    }
    const updateUser = Object.assign(user, body);
    return this.userRepo.save(updateUser);
  }

  async delete(id: number) {
    const result = await this.userRepo.delete(id);

    if (!result) {
      return new HttpException('User no found', HttpStatus.CONFLICT);
    }
    return true;
  }

  async queryBuilder(alias: string) {
    return this.userRepo.createQueryBuilder(alias);
  }
}
