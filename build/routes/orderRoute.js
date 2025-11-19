"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const orderHandler_1 = require("../handlers/orderHandler");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.orderRoute = express_1.default.Router();
const orderhandler = new orderHandler_1.OrderHandler();
exports.orderRoute.post('/', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderhandler.createOrder);
exports.orderRoute.get('/', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderhandler.getAllOrders);
exports.orderRoute.get('/search', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderhandler.searchOrders);
exports.orderRoute.get('/:id', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderhandler.getAllOrderById);
exports.orderRoute.patch('/:id', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderhandler.updateOrder);
exports.orderRoute.patch('/:id/cancle', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderhandler.cancelledProduct);
