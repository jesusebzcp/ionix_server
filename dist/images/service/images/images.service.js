"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const nest_aws_sdk_1 = require("nest-aws-sdk");
const aws_sdk_1 = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
let ImagesService = class ImagesService {
    constructor(s3) {
        this.s3 = s3;
    }
    uploadFile(imageBuffer, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.s3
                .upload({
                Bucket: process.env.AWS_BUCKET,
                Key: filename,
                Body: imageBuffer,
            })
                .promise();
            return res;
        });
    }
    getFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.s3.getSignedUrlPromise('getObject', {
                Bucket: process.env.AWS_BUCKET,
                Key: filename,
                Expires: 3600 * 73,
            });
            return url;
        });
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_aws_sdk_1.InjectAwsService)(aws_sdk_1.S3)),
    __metadata("design:paramtypes", [aws_sdk_1.S3])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map