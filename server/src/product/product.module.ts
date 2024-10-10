import { Module } from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { AdminProductController } from './admin-product.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ShopProductController } from './shop-product.controller';
import { ShopProductService } from './shop-product.service';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Product])],
  controllers: [AdminProductController, ShopProductController],
  providers: [AdminProductService, ShopProductService],
})
export class ProductModule {}
