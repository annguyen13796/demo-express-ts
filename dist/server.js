"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
// load Product router
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
// load env config
dotenv_1.default.config({
    path: "config/config.env",
});
// config listening port
const PORT = process.env.PORT || 5000;
//
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// body parser
app.use(express_1.default.json());
// user product router
app.use("/api/v1/products", productRoutes_1.default);
// app listen call
app.listen(PORT, () => console.log(`DEV: Server run at PORT ${PORT}`));
//# sourceMappingURL=server.js.map