import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/ErrorResponse";

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Server Error",
    });

    next();
};

export default errorHandler;
