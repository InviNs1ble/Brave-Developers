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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let Message = class Message {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор пользователя, отправившего сообщение' }),
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (author) => author.messages),
    __metadata("design:type", users_entity_1.User)
], Message.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'message', description: 'Сообщение пользователя' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '---', description: 'Дата и время отправки сообщения' }),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
Message = __decorate([
    (0, typeorm_1.Entity)('messages')
], Message);
exports.Message = Message;
//# sourceMappingURL=messages.entity.js.map