/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    if (!registerDto.email) {
      throw new ConflictException('El correo es requerido');
    }
    const existingUser = this.usersService.findOne(registerDto.email);
    if (existingUser) {
      throw new ConflictException('El correo ya esta registrado');
    }
    return this.usersService.create(registerDto as any);
  }

  @Post('login')
  login(@Body() LoginDto: LoginDto) {
    if (!LoginDto.email) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const user = this.usersService.findOne(LoginDto.email);

    if (!user || user.password != LoginDto.password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const { password, ...result } = user;
    return result;
  }
}
