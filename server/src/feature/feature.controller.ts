import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('feature')
export class FeatureController {
  constructor(
    private readonly featureService: FeatureService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('/add')
  @UseInterceptors(FileInterceptor('feature_image'))
  async addFeatureImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadFile(file);

      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        message: '🚀 ~ FeatureController ~ addFeatureImage ~ error',
      };
    }
  }
}
