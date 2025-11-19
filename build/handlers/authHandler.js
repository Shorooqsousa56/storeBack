"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandler = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const authService_1 = require("../services/authService");
class AuthHandler {
    authService = new authService_1.AuthService();
    signup = async (req, res) => {
        try {
            const order = await this.authService.signup(req.body);
            res.status(201).json(order);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    };
    login = async (req, res) => {
        try {
            const result = await this.authService.login(req.body);
            res.status(200).json(result);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    };
    logout = async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const result = await this.authService.logout(token);
            res.status(201).json(result);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    };
}
exports.AuthHandler = AuthHandler;
