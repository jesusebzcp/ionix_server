import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../../service/images/images.service';

@ApiTags('images')
@Controller('api/images')
export class ImagesController {
  constructor(private imagesServices: ImagesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Req() req: any,
  ) {
    if (!file || req.fileValidationError) {
      throw new BadRequestException('Invalid file provider');
    }

    const uploadFile = await this.imagesServices.uploadFile(
      file.buffer,
      file.originalname,
    );

    return uploadFile;
  }

  @Get(':id')
  async getFile(@Param('id') id: string) {
    return await this.imagesServices.getFile(id);
  }
}
