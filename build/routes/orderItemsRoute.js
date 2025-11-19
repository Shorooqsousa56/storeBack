"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemsRoute = void 0;
const express_1 = __importDefault(require("express"));
const orderItemsHandler_1 = require("../handlers/orderItemsHandler");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.orderItemsRoute = express_1.default.Router();
const orderItemshandler = new orderItemsHandler_1.OrderItemsHandler();
exports.orderItemsRoute.post('/', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderItemshandler.createOrderItem);
exports.orderItemsRoute.get('/', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderItemshandler.getAllOrderItems);
exports.orderItemsRoute.get('/:id', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderItemshandler.getOrderItemsById);
exports.orderItemsRoute.get('/order/:id', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderItemshandler.getItemsByOrder);
exports.orderItemsRoute.patch('/order/:id', (0, authMiddleware_1.authorization)(["admin", "customer"]), orderItemshandler.updateOrderItems);
