import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ShopProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  async getFilteredProducts(query: {
    category?: string;
    brand?: string;
    sortBy: string;
  }) {
    let { category, brand, sortBy = 'price-lowtohigh' } = query;

    return await this.productRepo.find({
      where: {
        category: category ? In(category.split(',')) : undefined,
        brand: brand ? In(brand.split(',')) : undefined,
      },

      order: this.getOrderOptions(sortBy),
    });
  }

  async getProductDetails(productId: string) {
    const product = await this.productRepo.findOneBy({ id: +productId });
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  private getOrderOptions(sortBy: string) {
    const order: { [key: string]: 'ASC' | 'DESC' } = {};
    const [field, direction] = sortBy.split('-');
    order[field] =
      direction === 'lowtohigh' || direction === 'atoz' ? 'ASC' : 'DESC';

    return order;
  }
}
