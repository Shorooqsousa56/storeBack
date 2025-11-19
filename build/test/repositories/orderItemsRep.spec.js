"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../helpers/reporter");
const db_1 = require("../../config/db");
const orderItemsRepository_1 = require("../../repositories/orderItemsRepository");
const orderRepository_1 = require("../../repositories/orderRepository");
const productRepository_1 = require("../../repositories/productRepository");
const productRep = new productRepository_1.ProductRepository();
const orderItemRep = new orderItemsRepository_1.OrderItemsRepository();
const orderRep = new orderRepository_1.OrderRepository();
describe("OrderItemsRepository", () => {
    let userId;
    let orderId;
    let productId;
    beforeAll(async () => {
        await db_1.pool.query(`delete from order_items`);
        await db_1.pool.query(`delete from orders`);
        await db_1.pool.query(`delete from products`);
        await db_1.pool.query(`delete from users`);
        const user = await db_1.pool.query(`
      INSERT INTO users (first_name, email, password, active)
      VALUES ('test', 'test@test.com', '123456', true)
      RETURNING id
    `);
        userId = user.rows[0].id;
        const order = await db_1.pool.query(`
      INSERT INTO orders (user_id, total_price, status)
      VALUES ($1, 200, 'pending')
      RETURNING id
    `, [userId]);
        orderId = order.rows[0].id;
        const product = await db_1.pool.query(`
      INSERT INTO products (name, description, price, stock_balance, picture)
      VALUES ('Product A', 'Description', 100, 10, 'pic.jpg')
      RETURNING id
    `);
        productId = product.rows[0].id;
    });
    beforeEach(async () => {
        await db_1.pool.query(`delete from order_items`);
    });
    afterAll(async () => {
        await db_1.pool.query(`delete from order_items`);
        await db_1.pool.query(`delete from orders`);
        await db_1.pool.query(`delete from users`);
        await db_1.pool.query(`delete from products`);
    });
    const testItem = {
        "order_id": 0,
        "product_id": 0,
        "quantity": 3,
        "price": 50
    };
    //testing create
    it("should create a new order item", async () => {
        testItem.order_id = orderId;
        testItem.product_id = productId;
        const item = await orderItemRep.create(testItem);
        expect(item).toBeDefined();
        expect(item.quantity).toBe(3);
        expect(Number(item.price)).toBe(50);
    });
    //testing update
    it("should throw error if item already exists in order", async () => {
        testItem.order_id = orderId;
        testItem.product_id = productId;
        const item = await orderItemRep.create(testItem);
        await expectAsync(orderItemRep.create(testItem)).toBeRejectedWithError("item already exist in this order");
    });
    //testing deactivate
    it("should update order item ", async () => {
        testItem.order_id = orderId;
        testItem.product_id = productId;
        const item = await orderItemRep.create(testItem);
        const updateItem = await orderItemRep.update(item.id, { quantity: 5, price: 200 });
        expect(updateItem.quantity).toBe(5);
        expect(Number(updateItem.price)).toBe(200);
    });
});
