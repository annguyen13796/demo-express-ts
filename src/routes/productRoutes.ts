import express from "express";
import {
    createAProduct,
    deleteAProduct,
    getAProduct,
    getAllProducts,
    updateAProduct,
} from "../controllers/productController";

const productRouter = express.Router();

// Product routes
productRouter.route("/").get(getAllProducts).post(createAProduct);

productRouter.route("/:id").get(getAProduct).put(updateAProduct).delete(deleteAProduct);

export default productRouter;
