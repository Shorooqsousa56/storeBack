"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const usersRoute_1 = require("./routes/usersRoute");
const productsRoute_1 = require("./routes/productsRoute");
const orderRoute_1 = require("./routes/orderRoute");
const orderItemsRoute_1 = require("./routes/orderItemsRoute");
const authRoute_1 = require("./routes/authRoute");
const body_parser_1 = __importDefault(require("body-parser"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
//authenticate
exports.app.use('/auth', authRoute_1.authRoute);
exports.app.use('/users', usersRoute_1.userRoute);
exports.app.use('/products', authMiddleware_1.authenticate, productsRoute_1.productRoute);
exports.app.use('/orders', authMiddleware_1.authenticate, orderRoute_1.orderRoute);
exports.app.use('/orderItems', authMiddleware_1.authenticate, orderItemsRoute_1.orderItemsRoute);
