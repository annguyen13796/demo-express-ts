"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAProduct = exports.updateAProduct = exports.createAProduct = exports.getAProduct = exports.getAllProducts = void 0;
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const asyncHandler_1 = __importDefault(require("middleware/asyncHandler"));
exports.getAllProducts = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse((0, fs_1.readFileSync)("./src/files/products.json").toString());
    res.status(200).json({
        success: true,
        data: data,
    });
}));
exports.getAProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestProductId = req.params.id;
    const products = JSON.parse((0, fs_1.readFileSync)("./src/files/products.json").toString());
    const productIndex = products === null || products === void 0 ? void 0 : products.findIndex((product) => product.id === requestProductId);
    if (productIndex !== -1) {
        res.status(200).json({
            success: true,
            data: products[productIndex],
        });
    }
    else {
        res.status(404).json({
            success: false,
            msg: `Cannot found product with Id of ${requestProductId}`,
        });
    }
}));
exports.createAProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productBody = req.body;
    const products = JSON.parse((0, fs_1.readFileSync)("./src/files/products.json").toString());
    products.push(Object.assign(Object.assign({}, productBody), { id: (0, uuid_1.v4)() }));
    (0, fs_1.writeFileSync)("./src/files/products.json", JSON.stringify(products));
    res.status(201).json({
        success: true,
    });
}));
exports.updateAProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestProductId = req.params.id;
    const products = JSON.parse((0, fs_1.readFileSync)("./src/files/products.json").toString());
    const productIndex = products === null || products === void 0 ? void 0 : products.findIndex((product) => product.id === requestProductId);
    if (productIndex !== -1) {
        const requestBody = req.body;
        products[productIndex] = Object.assign(Object.assign({}, products[productIndex]), requestBody);
        (0, fs_1.writeFileSync)("./src/files/products.json", JSON.stringify(products));
        res.status(200).json({
            success: true,
            msg: `Success update product with Id of ${requestProductId}`,
        });
    }
    else {
        res.status(404).json({
            success: false,
            msg: `Cannot found product with Id of ${requestProductId}`,
        });
    }
}));
exports.deleteAProduct = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requestProductId = req.params.id;
    const products = JSON.parse((0, fs_1.readFileSync)("./src/files/products.json").toString());
    const productIndex = products === null || products === void 0 ? void 0 : products.findIndex((product) => product.id === requestProductId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        (0, fs_1.writeFileSync)("./src/files/products.json", JSON.stringify(products));
        res.status(200).json({
            success: true,
            msg: `Success delete product with Id of ${requestProductId}`,
        });
    }
    else {
        res.status(404).json({
            success: false,
            msg: `Cannot found product with Id of ${requestProductId}`,
        });
    }
}));
//# sourceMappingURL=productController.js.map