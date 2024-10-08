import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return {
      success: true,
      message: 'register successfully',
      user: await this.authService.register(registerDto),
    };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(loginDto, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return {
      success: true,
      message: 'Logged out successfully!',
    };
  }

  @Get('check-auth')
  async checkAuth(@Req() req: Request) {
    // Lấy thông tin người dùng từ middleware
    const user = req['user'];
    return {
      success: true,
      message: 'Authenticated user',
      user,
    };
  }
}
