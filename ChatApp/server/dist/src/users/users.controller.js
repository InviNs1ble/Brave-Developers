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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const validation_pipe_1 = require("./../pipes/validation-pipe");
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/swagger/dist");
const user_dto_1 = require("./dto/user.dto");
const users_entity_1 = require("./users.entity");
const users_service_1 = require("./users.service");
const use_pipes_decorator_1 = require("@nestjs/common/decorators/core/use-pipes.decorator");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    create(userDto) {
        return this.userService.createUser(userDto);
    }
    getAll() {
        console.log("all");
        return this.userService.getAllUsers();
    }
    getById(id) {
        console.log("id");
        return this.userService.getUserById(id);
    }
};
__decorate([
    (0, dist_1.ApiOperation)({ summary: 'Создание пользователя' }),
    (0, dist_1.ApiResponse)({ status: 200, type: users_entity_1.User }),
    (0, use_pipes_decorator_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, dist_1.ApiOperation)({ summary: 'Получение всех пользователей' }),
    (0, dist_1.ApiResponse)({ status: 200, type: [users_entity_1.User] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, dist_1.ApiOperation)({ summary: 'Получение пользователя по id' }),
    (0, dist_1.ApiResponse)({ status: 200, type: [users_entity_1.User] }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getById", null);
UsersController = __decorate([
    (0, dist_1.ApiTags)('Пользователи'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map