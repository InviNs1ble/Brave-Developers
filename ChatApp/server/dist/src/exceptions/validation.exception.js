"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const enums_1 = require("@nestjs/common/enums");
const exceptions_1 = require("@nestjs/common/exceptions");
class ValidationException extends exceptions_1.HttpException {
    constructor(response) {
        super(response, enums_1.HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map