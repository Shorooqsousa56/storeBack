"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToken = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const blacklist = new Set();
function createToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
}
exports.createToken = createToken;
function verifyToken(token) {
    if (blacklist.has(token))
        return null;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
        ;
    }
    catch {
        return null;
    }
}
exports.verifyToken = verifyToken;
function removeToken(token) {
    blacklist.add(token);
}
exports.removeToken = removeToken;
