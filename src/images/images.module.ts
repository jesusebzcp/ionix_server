import { Module } from '@nestjs/common';

import { ImagesController } from './controller/images/images.controller';
import { ImagesService } from './service/images/images.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
