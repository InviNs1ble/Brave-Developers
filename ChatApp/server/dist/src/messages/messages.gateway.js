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
exports.MessagesGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const constants_1 = require("../../constants");
const socket_io_1 = require("socket.io");
const message_dto_1 = require("./dto/message.dto");
const messages_service_1 = require("./messages.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const users = {};
let MessagesGateway = class MessagesGateway {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    afterInit(server) {
        console.log(server);
    }
    handleConnection(client, ...args) {
        const userName = client.handshake.query.username;
        const socketId = client.id;
        users[socketId] = userName;
        client.broadcast.emit("log", `${userName} подключился`);
    }
    handleDisconnect(client) {
        const socketId = client.id;
        const userName = users[socketId];
        delete users[socketId];
        client.broadcast.emit("log", `${userName} отключился`);
    }
    async handleMessagesGet() {
        const messages = await this.messagesService.getMessages();
        this.server.emit("messages", messages);
    }
    async handleMessagePost(messageDto) {
        const createdMessage = await this.messagesService.createMessage(messageDto);
        this.server.emit("message:post", createdMessage);
        this.handleMessagesGet();
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, websockets_1.SubscribeMessage)("messages:get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleMessagesGet", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, websockets_1.SubscribeMessage)("message:post"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleMessagePost", null);
MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: constants_1.CLIENT_URI
        },
        serveClient: false,
        namespace: "chat"
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesGateway);
exports.MessagesGateway = MessagesGateway;
//# sourceMappingURL=messages.gateway.js.map