"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../helpers/reporter");
const db_1 = require("../../config/db");
const authService_1 = require("../../services/authService");
describe('AuthService', () => {
    const authService = new authService_1.AuthService();
    //sign up test
    //successfull sign up.
    it('should signup a new user successfully', async () => {
        await db_1.pool.query('truncate table users restart identity cascade');
        const usertest = {
            "first_name": "shorooq",
            "email": "shorooq@gmail.com",
            "role": "admin",
            "password": "123456"
        };
        const user = await authService.signup(usertest);
        expect(user.email).toBe(usertest.email);
        expect(user.first_name).toBe(usertest.first_name);
    });
    //invalid email.
    it('should throw an error for duplicate email', async () => {
        await db_1.pool.query('truncate table users restart identity cascade');
        const usertest = {
            "first_name": "shorooq",
            "email": "shorooq@gmail.com",
            "role": "admin",
            "password": "123456"
        };
        await authService.signup(usertest);
        await expectAsync(authService.signup(usertest)).toBeRejectedWithError("email already Exist");
    });
    it('should throw an error for invalid email', async () => {
        await db_1.pool.query('truncate table users restart identity cascade');
        const usertest = {
            "first_name": "shorooq",
            "email": "shorooqgmail.com",
            "role": "admin",
            "password": "123456"
        };
        await expectAsync(authService.signup(usertest)).toBeRejectedWithError("email is not valid");
    });
    //login test
    //successfull login
    it('should login successfully and return token', async () => {
        await db_1.pool.query('truncate table users restart identity cascade');
        const usertest = {
            "first_name": "shorooq",
            "email": "shorooq@gmail.com",
            "role": "admin",
            "password": "123456"
        };
        await authService.signup(usertest);
        const user = await authService.login({ email: "shorooq@gmail.com", password: "123456" });
        expect(user.token).toBeDefined();
        expect(user.message).toBe("login successful");
    });
    //login with invalid email
    it('should throw an error  for invalid email', async () => {
        await db_1.pool.query('truncate table users restart identity cascade');
        const usertest = {
            "first_name": "shorooq",
            "email": "shorooq@gmail.com",
            "role": "admin",
            "password": "123456"
        };
        await authService.signup(usertest);
        await expectAsync(authService.login({ email: "sh@gmail.com", password: "123456" })).toBeRejectedWithError("invalid email");
    });
});
