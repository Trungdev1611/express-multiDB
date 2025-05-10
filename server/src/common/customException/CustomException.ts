import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomException<T> extends HttpException {
    constructor(error?: T, status?: number) {
        super({message: "error", statusCode: status|| 400, error: error || null}, HttpStatus.BAD_REQUEST)
    }
}