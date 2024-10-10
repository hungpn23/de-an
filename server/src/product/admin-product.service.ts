import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class AdminProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    console.log(
      `🚀 ~ AdminProductService ~ createProduct ~ createProductDto:`,
      createProductDto,
    );
    const newProduct = this.productRepo.create(createProductDto);
    return await this.productRepo.save(newProduct);
  }

  async fetchAllProducts() {
    return await this.productRepo.find();
  }

  async editProduct(productId: string, updateProductDto: UpdateProductDto) {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = updateProductDto;

    const found = await this.productRepo.findOneBy({ id: +productId });
    if (!found) throw new NotFoundException('Product not found');

    found.title = title || found.title;
    found.description = description || found.description;
    found.category = category || found.category;
    found.brand = brand || found.brand;
    found.price = price || found.price;
    found.salePrice = salePrice || found.salePrice;
    found.totalStock = totalStock || found.totalStock;
    found.image = image || found.image;
    found.averageReview = averageReview || found.averageReview;

    return await this.productRepo.save(found);
  }

  async deleteProduct(productId: string) {
    const found = await this.productRepo.findOneBy({ id: +productId });
    if (!found) throw new NotFoundException('Product not found');

    await this.productRepo.delete({ id: +productId });
  }
}
