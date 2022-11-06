import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { configurationEnv } from './config/env.configuration';
import { ImagesModule } from './images/images.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configurationEnv] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('database.host'),
          port: parseInt(configService.get('database.port'), 10),
          database: configService.get('database.database'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
          logger: 'file',
        };
      },
      inject: [ConfigService],
    }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: async (configService: ConfigService) => {
          return {
            region: configService.get('storage.aws_region'),
            credentials: {
              accessKeyId: configService.get('storage.aws_public_key'),
              secretAccessKey: configService.get('storage.aws_secret_key'),
            },
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      services: [S3],
    }),
    UsersModule,
    AuthModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
