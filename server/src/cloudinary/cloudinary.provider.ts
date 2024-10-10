import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'daekbrdca',
      api_key: '896329211472275',
      api_secret: 'gM2mLMsaiRmNSHPKNfLCtqCdge8',
    });
  },
};
