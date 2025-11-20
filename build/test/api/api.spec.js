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
    //users APIs
    it("admin should get all customers", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get("/users/customer")
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it("admin should get user by id", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/users/${userId}`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body.id).toBe(userId);
    });
    it("admin should search for user by query", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/users/search?q=shoroq`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toBeDefined();
    });
    it("customer should deactivate their account", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/users/${userId}/deactive`)
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body.active).toBe(false);
    });
    it("customer should update their email", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/users/${userId}/Email`)
            .set("authorization", `Bearer ${customerToken}`).send({ email: "new@gmail.com" });
        expect(res.body.email).toBe("new@gmail.com");
    });
    it("customer should update their password", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/users/${userId}/Password`)
            .set("authorization", `Bearer ${customerToken}`).send({ Password: "123" });
        expect(res.body).toBeDefined();
    });
    it("customer should update their fields", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/users/${userId}`)
            .set("authorization", `Bearer ${customerToken}`).send({ first_name: "Sh", last_name: "z" });
        expect(res.body.first_name).toBe("Sh");
        expect(res.body.last_name).toBe("z");
    });
    it("admin should get user by email", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/users/Email?email=new@gmail.com`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body.email).toBe("new@gmail.com");
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
    it("customer should get products", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get("/products")
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body).toBeDefined();
    });
    it("customer should search products", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/products/search?q=Laptop`)
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it("customer should get product by id", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/products/${productId}`)
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body).toBeDefined();
        expect(res.body.id).toBe(productId);
    });
    it("admin should update product", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/products/${productId}`)
            .set("authorization", `Bearer ${adminToken}`)
            .send({
            name: "Laptop update",
            price: 2500,
        });
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe("Laptop update");
        expect(Number(res.body.price)).toBe(2500);
    });
    // Orders
    it("admin & customer should get all orders", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get("/orders")
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toBeDefined();
    });
    it("admin & customer should get order by id", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/orders/${orderId}`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toBeDefined();
        expect(res.body.id).toBe(orderId);
    });
    it("admin & customer should search orders", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/orders/search?status=completed`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toBeDefined();
    });
    it("admin & customer should search orders by price", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/orders/search?total_price=150.5`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toBeDefined();
    });
    // Order Items
    it("admin & customer should get all order items", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get("/orderItems")
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toBeDefined();
        expect(res.body.length).toBeGreaterThan(0);
    });
    it("admin & customer should get order item by id", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/orderItems/${orderItemId}`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(res.body).toBeDefined();
        expect(res.body.id).toBe(orderItemId);
    });
    it("admin & customer should update order item", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/orderItems/order/${orderItemId}`)
            .set("authorization", `Bearer ${adminToken}`).send({ quantity: 7, price: 100 });
        expect(res.body).toBeDefined();
        expect(Number(res.body.quantity)).toBe(7);
        expect(Number(res.body.price)).toBe(100);
    });
    it("admin & customer should get items by order id", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/orderItems/order/${orderId}`)
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body).toBeDefined();
    });
    it("admin & customer should update order status", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/orders/${orderId}`)
            .set("authorization", `Bearer ${adminToken}`).send({ status: "pending" });
        expect(res.body).toBeDefined();
        expect(res.body.status).toBe("pending");
    });
    it("admin & customer should cancel their order", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .patch(`/orders/${orderId}/cancle`)
            .set("authorization", `Bearer ${customerToken}`);
        expect(res.body).toBeDefined();
        expect(res.body.cancelled.status).toBe("cancelled");
    });
});
