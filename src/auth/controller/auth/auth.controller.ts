import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoginDto } from '../../dto/login.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AuthService } from '../../service/auth/auth.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authServices: AuthService) {}
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authServices.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUser(@Request() req: any) {
    return req.user;
  }
}
