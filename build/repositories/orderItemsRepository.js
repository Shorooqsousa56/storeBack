"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemsRepository = void 0;
const db_1 = require("../config/db");
const orderRepository_1 = require("./orderRepository");
const orderRep = new orderRepository_1.OrderRepository();
class OrderItemsRepository {
    async create(orderItem) {
        const { order_id, product_id, quantity, price } = orderItem;
        const allOrderItem = `select * from order_items where order_id=$1 and product_id=$2`;
        const isExist = await db_1.pool.query(allOrderItem, [order_id, product_id]);
        if (isExist.rows.length > 0) {
            throw new Error("item already exist in this order");
        }
        ;
        const query = `insert into order_items (order_id,product_id,quantity,price) values ($1,$2,$3,$4) returning *`;
        const result = await db_1.pool.query(query, [order_id, product_id, quantity, price]);
        return result.rows[0];
    }
    async getAll() {
        const query = `select * from order_items order by id asc`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    async getById(id) {
        const query = `select * from order_items where id=$1`;
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0] || null;
    }
    async getByOrder(order_id) {
        const query = `select * from order_items where order_id=$1`;
        const result = await db_1.pool.query(query, [order_id]);
        return result.rows;
    }
    async update(id, fields_updated) {
        const recentOrderItem = await this.getById(id);
        if (!recentOrderItem)
            throw new Error("Order item not available");
        const recentOrder = await orderRep.getById(recentOrderItem.order_id);
        if (!recentOrder)
            throw new Error("order not found");
        if (recentOrder.status !== 'pending')
            throw new Error("Cannot update items of completed or cancelled orders");
        const { quantity, price } = fields_updated;
        const query = `update order_items set 
            quantity=COALESCE($1, quantity),
            price=COALESCE($2, price)
            where id =$3 returning *`;
        const result = await db_1.pool.query(query, [quantity, price, id]);
        return result.rows[0] || null;
    }
}
exports.OrderItemsRepository = OrderItemsRepository;
