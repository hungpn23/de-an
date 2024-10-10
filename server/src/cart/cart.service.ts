import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
    const user = await this.userRepo.findOneBy({ id: +userId });

    let cart = await this.cartRepo.findOneBy({ user });
    if (!cart) {
      cart = this.cartRepo.create();
      cart.user = user;
      cart = await this.cartRepo.save(cart);
    }

    let cartItem = await this.cartItemRepo.findOneBy({
      cart,
      product,
    });
    if (!cartItem) {
      cartItem = this.cartItemRepo.create();
      cartItem.cart = cart;
      cartItem.product = product;
      cartItem.quantity += quantity;
      cartItem = await this.cartItemRepo.save(cartItem);
    } else {
      cartItem.quantity += quantity;
      cartItem = await this.cartItemRepo.save(cartItem);
    }

    return await this.cartRepo.findOne({
      where: { id: cart.id },
      relations: ['user', 'cartItem'],
    });
  }
}
