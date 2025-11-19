"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PEPPER = process.env.PEPPER;
function confirmPassword(plainPassword, hashedPassword) {
    return bcrypt_1.default.compareSync(plainPassword + PEPPER, hashedPassword);
}
exports.confirmPassword = confirmPassword;
