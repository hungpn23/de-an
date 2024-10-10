import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShopProductService } from './shop-product.service';

@Controller('/shop/products')
export class ShopProductController {
  constructor(private readonly shopProductService: ShopProductService) {}

  @Get('/get')
  async getFilteredProducts(
    @Query() query: { category?: string[]; brand?: string[]; sortBy: string },
  ) {
    try {
      return {
        success: true,
        data: await this.shopProductService.getFilteredProducts(query),
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  @Get('/get/:id')
  async getProductDetails(@Param('id') productId: string) {
    try {
      return {
        success: true,
        data: await this.shopProductService.getProductDetails(productId),
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
