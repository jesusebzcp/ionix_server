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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    findAll({ limit = 10, offset = 1, order }) {
        return this.userRepo.find({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                username: true,
                password: false,
                createAt: true,
                imageUrl: true,
            },
            skip: offset,
            take: limit,
            order: {
                createAt: order === 'asc' ? -1 : 1,
            },
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({
                where: {
                    id,
                },
            });
            if (!user) {
                return new common_1.HttpException('User no found', common_1.HttpStatus.CONFLICT);
            }
            return user;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUserEmail = yield this.userRepo.findOne({
                where: {
                    email: body.email,
                },
            });
            if (findUserEmail) {
                return new common_1.HttpException('the mail is already in use', common_1.HttpStatus.CONFLICT);
            }
            const findUserUsername = yield this.userRepo.findOne({
                where: {
                    username: body.username,
                },
            });
            if (findUserUsername) {
                return new common_1.HttpException('the username already exists', common_1.HttpStatus.CONFLICT);
            }
            const newUser = this.userRepo.create(body);
            return yield this.userRepo.save(newUser);
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({
                where: {
                    id,
                },
            });
            if (!user) {
                return new common_1.HttpException('User no found', common_1.HttpStatus.CONFLICT);
            }
            const updateUser = Object.assign(user, body);
            return this.userRepo.save(updateUser);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userRepo.delete(id);
            if (!result) {
                return new common_1.HttpException('User no found', common_1.HttpStatus.CONFLICT);
            }
            return true;
        });
    }
    queryBuilder(alias) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.createQueryBuilder(alias);
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map