import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token; // Lấy token từ cookie
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized user!',
      });
    }

    try {
      // Xác minh token
      const decoded = await this.jwtService.verifyAsync(token);
      req['user'] = decoded; // Gán thông tin người dùng vào request
      next(); // Chuyển sang middleware hoặc route handler tiếp theo
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized user!',
      });
    }
  }
}
