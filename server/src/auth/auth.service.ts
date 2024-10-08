import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = this.userRepo.create(registerDto);
    return await this.userRepo.save(user);
  }

  async login(loginDto: LoginDto, res: Response) {
    try {
      const user = await this.userRepo.findOneBy({ email: loginDto.email });

      if (!user)
        throw new UnauthorizedException(
          `User ${loginDto.email} does not exist`,
        );

      if (user.password !== loginDto.password)
        throw new UnauthorizedException('Invalid password');

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        userName: user.userName,
      };
      const token = await this.jwtService.signAsync(payload);
      res.cookie('token', token, { httpOnly: true, secure: false });

      return {
        success: true,
        message: 'login successful',
        user: {
          email: user.email,
          role: user.role,
          id: user.id,
          userName: user.userName,
        },
      };
    } catch (e: any) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
