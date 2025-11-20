"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../helpers/reporter");
const db_1 = require("../../config/db");
const productRepository_1 = require("../../repositories/productRepository");
const productRep = new productRepository_1.ProductRepository();
describe("productRepository", () => {
    beforeAll(async () => {
        await db_1.pool.query(`delete from products`);
    });
    beforeEach(async () => {
        await db_1.pool.query(`delete from products`);
    });
    const testProduct = {
        "name": "lap",
        "description": "Some description",
        "price": 120,
        "stock_balance": 50,
        "picture": "https://example.com/image.jpg"
    };
    //testing create
    it("should create a new product", async () => {
        const product = await productRep.create(testProduct);
        expect(product).toBeDefined();
        expect(product.name).toBe(testProduct.name);
    });
    //testing update
    it("should update product", async () => {
        const product = await productRep.create(testProduct);
        const updateProduct = await productRep.update(product.id, { name: "updated name", price: 2000.00 });
        expect(updateProduct.name).toBe("updated name");
        expect(Number(updateProduct.price)).toBe(2000.00);
    });
    //testing get all
    it("should return all products", async () => {
        await productRep.create(testProduct);
        await productRep.create({ ...testProduct, name: "desk", price: 200 });
        const products = await productRep.getAll();
        expect(products.length).toBe(2);
    });
    //testing get by id
    it("should return product by id", async () => {
        const product = await productRep.create(testProduct);
        const result = await productRep.getById(product.id);
        expect(result.id).toBe(product.id);
    });
    //testing search
    it("should search product by name or description", async () => {
        await productRep.create(testProduct);
        const result = await productRep.search("lap");
        expect(result.length).toBeGreaterThan(0);
    });
});
