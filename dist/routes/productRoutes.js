"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("controllers/productController");
const productRouter = express_1.default.Router();
// Product routes
productRouter.route("/").get(productController_1.getAllProducts).post(productController_1.createAProduct);
productRouter.route("/:id").get(productController_1.getAProduct).put(productController_1.updateAProduct).delete(productController_1.deleteAProduct);
exports.default = productRouter;
//# sourceMappingURL=productRoutes.js.map