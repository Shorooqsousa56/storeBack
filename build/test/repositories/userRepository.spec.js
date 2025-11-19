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
    //testing create
    it("should create a new user", async () => {
        const user = await userRep.create(testUser);
        expect(user).toBeDefined();
        expect(user.email).toBe("shorooq@gmail.com");
    });
    //testing update
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
});
