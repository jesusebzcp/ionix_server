import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtAuthService: JwtService,
  ) {}
  async login(loginCreds: LoginDto) {
    const user = await this.userRepo.findOne({
      where: {
        email: loginCreds.email,
      },
    });

    if (!user) {
      return new HttpException('User no found', HttpStatus.NOT_FOUND);
    }

    const isEqual = await compare(loginCreds.password, user.password);

    if (!isEqual) {
      return new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
    const payload = { id: user.id };
    const access_token = this.jwtAuthService.sign(payload);
    return {
      access_token,
    };
  }
}
