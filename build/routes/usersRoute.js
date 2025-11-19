"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const usersHandler_1 = require("../handlers/usersHandler");
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.userRoute = express_1.default.Router();
const userhandler = new usersHandler_1.userHandler();
exports.userRoute.get('/customer', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin"]), userhandler.getAllUsers);
exports.userRoute.get('/Email', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin"]), userhandler.getUsersByEmail);
exports.userRoute.get('/search', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin"]), userhandler.searchUsers);
exports.userRoute.get('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin"]), userhandler.getUsersById);
exports.userRoute.patch('/:id/deactive', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin", "customer"]), userhandler.deactiveUser);
exports.userRoute.patch('/:id/Email', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin", "customer"]), userhandler.updateEmail);
exports.userRoute.patch('/:id/Password', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin", "customer"]), userhandler.updatePassword);
exports.userRoute.patch('/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorization)(["admin", "customer"]), userhandler.updateUser);
