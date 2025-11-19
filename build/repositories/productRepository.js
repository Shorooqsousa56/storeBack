"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const db_1 = require("../config/db");
class ProductRepository {
    async create(product) {
        const { name, description, price, stock_balance, picture } = product;
        const query = `insert into products (name,description,price,stock_balance,picture) values ($1,$2,$3,$4,$5) returning *`;
        const result = await db_1.pool.query(query, [name, description, price, stock_balance ?? 0, picture]);
        return result.rows[0];
    }
    async getAll() {
        const query = `select * from products order by id asc`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    async getById(id) {
        const query = `select * from products where id=$1`;
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0] || null;
    }
    async update(id, fields_updated) {
        const { name, description, price, stock_balance, picture } = fields_updated;
        const query = `update products set 
      name=COALESCE($1, name),
     description=COALESCE($2, description),
       price = COALESCE($3, price),
       stock_balance=COALESCE($4, stock_balance),
       picture=COALESCE($5, picture)
       where id =$6 returning *
    
      `;
        const result = await db_1.pool.query(query, [name, description, price, stock_balance, picture, id]);
        return result.rows[0] || null;
    }
    async delete(id) {
        const query = `delete from products where id =$1 returning *`;
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0] || null;
    }
    async search(search) {
        const query = `select * from products where name ilike $1 or description ilike $1  order by id asc`;
        const result = await db_1.pool.query(query, [`%${search}%`]);
        return result.rows;
    }
}
exports.ProductRepository = ProductRepository;
