class ErrorResponse extends Error {
    constructor(message: string, readonly statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ErrorResponse;
