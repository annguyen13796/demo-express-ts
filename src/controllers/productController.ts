import { Request, Response, NextFunction } from "express";

import asyncHandler from "../middleware/async";
import DB from "../utils/DB";
import ErrorResponse from "../utils/ErrorResponse";

type Product = { id: string; title: string; description: string };

const productsDB = new DB<Product>("./src/files/products.json");

export const getAllProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const products = productsDB.getData();

    res.status(200).json({
        success: true,
        data: products,
    });
});

export const getAProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const products = productsDB.getData();

    const requestProductId = req.params.id;
    const productIndex = productsDB.findElementIndex(requestProductId);

    if (productIndex === -1) {
        return next(new ErrorResponse(`Cannot found product with Id of ${requestProductId}`, 404));
    }

    res.status(200).json({
        success: true,
        data: products[productIndex],
    });
});

export const createAProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const productBody = req.body;

    productsDB.createElement(productBody);

    res.status(201).json({
        success: true,
    });
});

export const updateAProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const requestProductId = req.params.id;
    const requestBody = req.body;

    const result = productsDB.updateElement(requestProductId, requestBody);

    if (result === -1) {
        return next(new ErrorResponse(`Cannot found product with Id of ${requestProductId}`, 404));
    }

    res.status(200).json({
        success: true,
        msg: `Success update product with Id of ${requestProductId}`,
    });
});

export const deleteAProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const requestProductId = req.params.id;

    const result = productsDB.deleteElement(requestProductId);

    if (result === -1) {
        return next(new ErrorResponse(`Cannot found product with Id of ${requestProductId}`, 404));
    }

    res.status(200).json({
        success: true,
        msg: `Success delete product with Id of ${requestProductId}`,
    });
});
