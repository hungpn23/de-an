import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminProductService } from './admin-product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/admin/products')
export class AdminProductController {
  constructor(private readonly adminProductService: AdminProductService) {}

  @Post('/upload-image')
  @UseInterceptors(FileInterceptor('my_file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
