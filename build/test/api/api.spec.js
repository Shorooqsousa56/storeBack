"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const db_1 = require("../../config/db");
let customerToken;
let adminToken;
let productId;
let orderId;
let orderItemId;
let userId;
describe("API test", () => {
    beforeAll(async () => {
        await db_1.pool.query('TRUNCATE TABLE  users,products, orders, order_items RESTART IDENTITY CASCADE');
    });
    // Signup APIs
    it("should signup new customer", async () => {
        const res = await (0, supertest_1.default)(app_1.app).post("/auth/signup").send({
            first_name: "shorooq",
            email: "shoroqq@gmail.com",
            password: "123456"
        });
        userId = res.body.id;
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
    });
    it("should signup new admin", async () => {
        const res = await (0, supertest_1.default)(app_1.app).post("/auth/signup").send({
            first_name: "adminTest",
            email: "Adminn@gmail.com",
            password: "123456",
            role: "admin"
        });
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
    });
    // Login APIs
    it("should login customer and return token", async () => {
        const res = await (0, supertest_1.default)(app_1.app).post("/auth/login").send({
            email: "shoroqq@gmail.com",
            password: "123456"
        });
        expect(res.body.token).toBeDefined();
        expect(typeof res.body.token).toBe("string");
        customerToken = res.body.token;
    });
    it("should login admin and return token", async () => {
        const res = await (0, supertest_1.default)(app_1.app).post("/auth/login").send({
            email: "Adminn@gmail.com",
            password: "123456"
        });
        expect(res.body.token).toBeDefined();
        expect(typeof res.body.token).toBe("string");
        adminToken = res.body.token;
    });
    // Product APIs
    it("admin should create product", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .post("/products")
            .set("authorization", `Bearer ${adminToken}`)
            .send({
            name: "Laptop Test",
            price: 2000,
            stock_balance: 5
        });
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
        productId = res.body.id;
    });
    it("customer should get products", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get("/products")
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body).toBeDefined();
    });
    // Orders
    it("customer should create order", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .post("/orders")
            .set("authorization", `Bearer ${customerToken}`)
            .send({
            user_id: userId,
            status: "pending",
            total_price: 150.50,
        });
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
        orderId = res.body.id;
    });
    // Order Items
    it("customer should create order items", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .post("/orderItems")
            .set("authorization", `Bearer ${customerToken}`)
            .send({
            order_id: orderId,
            product_id: productId,
            quantity: 2,
            price: 2000
        });
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
        orderItemId = res.body.id;
    });
    it("should get items by order", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/orderItems/order/${orderId}`)
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body).toBeDefined();
    });
});
