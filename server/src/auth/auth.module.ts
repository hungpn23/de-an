import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthMiddleware } from './auth.middleware';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    // Áp dụng middleware chỉ cho route GET /auth/check-auth
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/check-auth', method: RequestMethod.GET });
  }
}
