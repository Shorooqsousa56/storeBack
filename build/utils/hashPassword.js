"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PEPPER = process.env.PEPPER;
const SALT = Number(process.env.SALT_ROUNDS ?? 10);
function hashPassword(password) {
    const passwordHashed = bcrypt_1.default.hashSync(password + PEPPER, SALT);
    return passwordHashed;
}
exports.hashPassword = hashPassword;
