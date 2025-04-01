class AppError extends Error {
    constructor(message, statusCode, details = null) {
        super(message) //gọi constructor cha
        this.statusCode = statusCode //js không cần khai báo biến private trong class như java
        this.details = details
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError