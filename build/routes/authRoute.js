"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const authHandler_1 = require("../handlers/authHandler");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const express_1 = __importDefault(require("express"));
exports.authRoute = express_1.default.Router();
const authhandler = new authHandler_1.AuthHandler();
exports.authRoute.post('/signup', authhandler.signup);
exports.authRoute.post('/login', authhandler.login);
exports.authRoute.post('/logout', authMiddleware_1.authenticate, authhandler.logout);
