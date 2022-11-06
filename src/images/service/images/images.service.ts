import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ImagesService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async uploadFile(imageBuffer: Buffer, filename: string) {
    const res = await this.s3
      .upload({
        Bucket: process.env.AWS_BUCKET,
        Key: filename,
        Body: imageBuffer,
      })
      .promise();

    return res;
  }

  async getFile(filename: string) {
    const url = await this.s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_BUCKET,
      Key: filename,
      Expires: 3600 * 73,
    });
    return url;
  }
}
