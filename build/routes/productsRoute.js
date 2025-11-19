"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const productHandler_1 = require("../handlers/productHandler");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.productRoute = express_1.default.Router();
const producthandler = new productHandler_1.ProductHandler();
exports.productRoute.post('/', (0, authMiddleware_1.authorization)(["admin"]), producthandler.createProduct);
exports.productRoute.get('/', (0, authMiddleware_1.authorization)(["admin", "customer"]), producthandler.getAllProducts);
exports.productRoute.get('/search', (0, authMiddleware_1.authorization)(["admin", "customer"]), producthandler.searchProducts);
exports.productRoute.get('/:id', (0, authMiddleware_1.authorization)(["admin", "customer"]), producthandler.getAllProductById);
exports.productRoute.patch('/:id', (0, authMiddleware_1.authorization)(["admin"]), producthandler.updateProduct);
exports.productRoute.delete('/:id', (0, authMiddleware_1.authorization)(["admin"]), producthandler.deleteProduct);
