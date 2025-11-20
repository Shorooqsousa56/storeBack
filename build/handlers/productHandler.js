"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHandler = void 0;
const productRepository_1 = require("../repositories/productRepository");
const errorHandler_1 = require("../utils/errorHandler");
const productRep = new productRepository_1.ProductRepository();
class ProductHandler {
    async createProduct(req, res) {
        try {
            const product = await productRep.create(req.body);
            res.status(201).json(product);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getAllProducts(req, res) {
        try {
            const product = await productRep.getAll();
            res.status(401).json(product);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getAllProductById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const product = await productRep.getById(id);
            if (product == null) {
                res.status(404).json({ message: 'product not found!' });
            }
            res.status(200).json(product);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async updateProduct(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const product = await productRep.update(id, req.body);
            if (!product)
                return res.status(404).json({ message: 'product not found' });
            res.status(200).json(product);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async searchProducts(req, res) {
        try {
            const search = req.query.q;
            if (!search)
                return res.status(400).json({ message: 'Search is required' });
            const products = await productRep.search(search);
            res.status(200).json(products);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
}
exports.ProductHandler = ProductHandler;
