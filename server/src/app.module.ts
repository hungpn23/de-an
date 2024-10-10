import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mysql } from 'db/data-source';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { FeatureModule } from './feature/feature.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(Mysql),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CartModule,
    FeatureModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
