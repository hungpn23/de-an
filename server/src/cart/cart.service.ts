import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async addToCart(body: {
    userId: string;
    productId: string;
    quantity: number;
  }) {
    const { userId, productId, quantity } = body;
    if (!userId || !productId || quantity <= 0)
      throw new BadRequestException('Invalid data provided');

    const product = await this.productRepo.findOneBy({ id: +productId });
    if (!product) throw new NotFoundException('Product not found');
    let user = await this.userRepo.findOneBy({ id: +userId });

    let cartItem = await this.cartItemRepo.findOne({
      where: {
        cart: user.cart,
        product,
      },
      relations: ['cart', 'product'],
    });
    if (!cartItem) {
      cartItem = this.cartItemRepo.create();
      cartItem.cart = user.cart;
      cartItem.product = product;
      cartItem.quantity += quantity;
      cartItem = await this.cartItemRepo.save(cartItem);
    } else {
      cartItem.quantity += quantity;
      cartItem = await this.cartItemRepo.save(cartItem);
    }

    console.log('success');

    return cartItem;
  }

  async fetchCartItems(userId: string) {
    const user = await this.userRepo.findOneBy({ id: +userId });
    console.log(`🚀 ~ CartService ~ fetchCartItems ~ user:`, user);
    if (!user) throw new NotFoundException('User not found');

    console.log(user.cart);
    const cartItems = await this.cartItemRepo.find({
      where: { cart: user.cart },
      relations: ['cart', 'product'],
    });
    console.log(`🚀 ~ CartService ~ fetchCartItems ~ cartItems:`, cartItems);
  }
}
