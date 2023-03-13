import { HttpException } from '@nestjs/common/exceptions';
export declare class ValidationException extends HttpException {
    messages: any;
    constructor(response: any);
}
