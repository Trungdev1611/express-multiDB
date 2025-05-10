export interface ResponseSuccess<T> {
    message: string,
    statusCode: number,
    data: T
}

export interface ResponseError<T> {
    message: string,
    statusCode: number,
    data: T
}

export class BaseDTO {  //abstract class sẽ không cho tạo new, để tạo base chung
    constructor() {}
    successResponse<T>(data:T ): ResponseSuccess<T> {
        return {
            message: "success",
            statusCode: 200,
            data

        }
    }

    errResponse<T>(error: T):ResponseError<T> {
        return {
            message: "error",
            statusCode: 400,
            data: error
        }
 
    } 
}