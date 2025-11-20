"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemsHandler = void 0;
const orderItemsRepository_1 = require("../repositories/orderItemsRepository");
const errorHandler_1 = require("../utils/errorHandler");
const orderRepository_1 = require("../repositories/orderRepository");
const orderItemsRep = new orderItemsRepository_1.OrderItemsRepository();
const orderRep = new orderRepository_1.OrderRepository();
class OrderItemsHandler {
    async createOrderItem(req, res) {
        try {
            const orderItem = await orderItemsRep.create(req.body);
            const order = await orderRep.getById(orderItem.order_id);
            if (!order) {
                return res.status(404).json({ message: "order not found" });
            }
            if (order.status === "cancelled" || order.status === "completed") {
                return res.status(400).json({ message: "cannot add items to a cancelled or completed order" });
            }
            res.status(401).json(orderItem);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getAllOrderItems(req, res) {
        try {
            const orderItems = await orderItemsRep.getAll();
            res.status(200).json(orderItems);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getOrderItemsById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const orderItems = await orderItemsRep.getById(id);
            if (orderItems == null) {
                res.status(404).json({ message: 'order items not found!' });
            }
            res.status(200).json(orderItems);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async getItemsByOrder(req, res) {
        try {
            const order_id = parseInt(req.params.id);
            if (isNaN(order_id)) {
                return res.status(400).json({ message: 'order_id is required' });
            }
            const orderItems = await orderItemsRep.getByOrder(order_id);
            if (!orderItems || orderItems.length === 0) {
                return res.status(404).json({ message: 'order items not found!' });
            }
            res.status(200).json(orderItems);
        }
        //i use unknown instead of any because its more safe
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
    async updateOrderItems(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'id is required' });
            }
            const orderItems = await orderItemsRep.update(id, req.body);
            if (!orderItems)
                return res.status(404).json({ message: 'order item not found' });
            return res.status(200).json(orderItems);
        }
        catch (err) {
            (0, errorHandler_1.errorHandler)(err, res);
        }
    }
}
exports.OrderItemsHandler = OrderItemsHandler;
