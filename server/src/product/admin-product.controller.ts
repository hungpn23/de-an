import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('/admin/products')
export class AdminProductController {
  constructor(
    private readonly adminProductService: AdminProductService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('my_file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadFile(file);

      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        message: '🚀 ~ AdminProductController ~ uploadImage ~ error',
      };
    }
  }

  @Post('/add')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const newProduct =
      await this.adminProductService.createProduct(createProductDto);

    return {
      success: true,
      data: newProduct,
    };
  }

  @Get('/get')
  async fetchAllProducts() {
    return {
      success: true,
      data: await this.adminProductService.fetchAllProducts(),
    };
  }

  @Put('/edit/:id')
  async editProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.adminProductService.editProduct(
        productId,
        updateProductDto,
      );

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      console.log(`🚀 ~ AdminProductController ~ error:`, error);
      return {
        success: false,
        message: error,
      };
    }
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') productId: string) {
    try {
      return {
        success: true,
        data: await this.adminProductService.deleteProduct(productId),
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
