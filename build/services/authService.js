"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const validEmail_1 = require("../utils/validEmail");
const hashPassword_1 = require("../utils/hashPassword");
const confirmPassword_1 = require("../utils/confirmPassword");
const usersRepository_1 = require("../repositories/usersRepository");
const token_1 = require("../utils/token");
const token_2 = require("../utils/token");
class AuthService {
    userRep = new usersRepository_1.UserRepository();
    async signup(user) {
        if (!(0, validEmail_1.isValidEmail)(user.email))
            throw new Error("email is not valid");
        const existingUser = await this.userRep.getByEmail(user.email);
        if (existingUser)
            throw new Error("email already Exist");
        const hashed = (0, hashPassword_1.hashPassword)(user.password);
        user.password = hashed;
        const newUser = await this.userRep.create(user);
        return newUser;
    }
    async login(user) {
        const recentUser = await this.userRep.getByEmail(user.email);
        if (!recentUser)
            throw new Error("invalid email");
        const validPassword = (0, confirmPassword_1.confirmPassword)(user.password, recentUser.password);
        if (!validPassword)
            throw new Error("invalid password");
        const token = (0, token_1.createToken)(recentUser);
        return {
            message: "login successful",
            token,
        };
    }
    async logout(token) {
        (0, token_2.removeToken)(token);
        return { message: 'Logged out successfully' };
    }
}
exports.AuthService = AuthService;
