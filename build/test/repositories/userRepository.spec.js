"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../helpers/reporter");
const db_1 = require("../../config/db");
const usersRepository_1 = require("../../repositories/usersRepository");
const userRep = new usersRepository_1.UserRepository();
describe("userRepository", () => {
    beforeAll(async () => {
        await db_1.pool.query(`delete from users`);
    });
    beforeEach(async () => {
        await db_1.pool.query(`delete from users`);
    });
    const testUser = {
        "first_name": "shorooq",
        "last_name": "shorooq",
        "email": "shorooq@gmail.com",
        "role": "admin",
        "password": "123456",
        "active": true,
        "created_at": new Date(),
    };
    const customerUser = {
        "first_name": "shorooq",
        "last_name": "shorooq",
        "email": "customer@gmail.com",
        "password": "123456",
        "active": true,
        "created_at": new Date(),
    };
    //testing create
    it("should create a new user", async () => {
        const user = await userRep.create(testUser);
        expect(user).toBeDefined();
        expect(user.email).toBe("shorooq@gmail.com");
    });
    //testing update email
    it("should update email", async () => {
        const user = await userRep.create(testUser);
        const updateUser = await userRep.updateEmail(user.id, "new@gmail.com");
        expect(updateUser.email).toBe("new@gmail.com");
    });
    //testing deactivate
    it("should deactive user", async () => {
        const user = await userRep.create(testUser);
        const updateUser = await userRep.deactivate(user.id);
        expect(updateUser.active).toBe(false);
    });
    //testing get all
    it("should return all users", async () => {
        await userRep.create(customerUser);
        await userRep.create({ ...customerUser, email: "sh@gmail.com" });
        const users = await userRep.getAll();
        expect(users.length).toBe(2);
    });
    //testing get by id
    it("should return user by id", async () => {
        const user = await userRep.create(testUser);
        const result = await userRep.getById(user.id);
        expect(result.email).toBe(user.email);
    });
    //testing get by email
    it("should return user by email", async () => {
        const user = await userRep.create(testUser);
        const result = await userRep.getByEmail(user.email);
        expect(result.id).toBe(user.id);
    });
    //testing search
    it("should search user by name or email", async () => {
        const user = await userRep.create(testUser);
        const result = await userRep.search("sho");
        expect(result.length).toBeGreaterThan(0);
    });
    //testing update user
    it("should update user fields", async () => {
        const user = await userRep.create(testUser);
        const updateUser = await userRep.update(user.id, { first_name: "lana" });
        expect(updateUser.first_name).toBe("lana");
    });
    //testing update password
    it("should update password", async () => {
        const user = await userRep.create(testUser);
        const updateUser = await userRep.updatePassword(user.id, "123");
        expect(updateUser).toBeDefined();
    });
});
