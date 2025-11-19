"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHandler = void 0;
const orderRepository_1 = require("../repositories/orderRepository");
const errorHandler_1 = require("../utils/errorHandler");
const orderRep = new orderRepository_1.OrderRepository();
class OrderHandler {
    async createOrder(req, res) {
        try {
            const order = await orderRep.create(req.body);
            res.status(500).json(order);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getAllOrders(req, res) {
        try {
            const order = await orderRep.getAll();
            res.status(200).json(order);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getAllOrderById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const order = await orderRep.getById(id);
            if (order == null) {
                res.status(404).json({ message: 'order not found!' });
            }
            res.status(200).json(order);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async updateOrder(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const order = await orderRep.update(id, req.body);
            if (!order)
                return res.status(404).json({ message: 'order not found' });
            res.status(200).json(order);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async cancelledProduct(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const order = await orderRep.cancleOrder(id);
            if (!order)
                return res.status(404).json({ message: 'order not found' });
            res.status(200).json({ message: 'order cancelled successfully', cancelled: order });
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async searchOrders(req, res) {
        try {
            const search = req.query.q;
            if (!search)
                return res.status(400).json({ message: 'Search is required' });
            const orders = await orderRep.search(search);
            res.status(200).json(orders);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
}
exports.OrderHandler = OrderHandler;
