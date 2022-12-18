import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import errorHandler from "./middleware/error";

// load Product router
import productRouter from "./routes/productRoutes";

// load env config
dotenv.config({
    path: "config/config.env",
});

// create app
const app: Express = express();

// config listening port
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());

// env check middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

/**
 * REMEMBER TO LOAD ROUTER FIRST, THEN ERROR HANDLER
 * BECAUSE WE BUILD MIDDLEWARE ROUTER TO HANDLE THE REQUEST FIRST, THEN HANDLE THE ERROR IF AN ERROR OCCUR
 */

// FIRST STEP: use product router middleware
app.use("/api/v1/products", productRouter);

// NEXT STEP: use error handler middleware
app.use(errorHandler);

// app listen call
app.listen(PORT, () => console.log(`DEV: Server run at PORT ${PORT}`));
