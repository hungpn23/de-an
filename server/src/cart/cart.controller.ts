import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('/shop/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async addToCart(
    @Body() body: { userId: string; productId: string; quantity: number },
  ) {
    try {
      return {
        success: true,
        data: await this.cartService.addToCart(body),
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  @Get('/get/:userId')
  async fetchCartItems(@Param('userId') userId: string) {
    try {
      return {
        success: true,
        data: await this.cartService.fetchCartItems(userId),
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
