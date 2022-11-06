"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const env_configuration_1 = require("./config/env.configuration");
const images_module_1 = require("./images/images.module");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const aws_sdk_1 = require("aws-sdk");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ load: [env_configuration_1.configurationEnv] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
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
                }),
                inject: [config_1.ConfigService],
            }),
            nest_aws_sdk_1.AwsSdkModule.forRootAsync({
                defaultServiceOptions: {
                    useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                        return {
                            region: configService.get('storage.aws_region'),
                            credentials: {
                                accessKeyId: configService.get('storage.aws_public_key'),
                                secretAccessKey: configService.get('storage.aws_secret_key'),
                            },
                        };
                    }),
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                },
                services: [aws_sdk_1.S3],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            images_module_1.ImagesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map