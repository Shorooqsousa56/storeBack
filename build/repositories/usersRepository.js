"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../config/db");
const hashPassword_1 = require("../utils/hashPassword");
const validEmail_1 = require("../utils/validEmail");
class UserRepository {
    async create(user) {
        const { first_name, last_name, email, password, role, active, created_at } = user;
        const query = `insert into users (first_name,last_name, email, password, role, active, created_at) values ($1,$2,$3,$4,$5,$6,$7) returning *`;
        const result = await db_1.pool.query(query, [first_name, last_name || null, email, password, role || 'customer', active ?? true, created_at || new Date()]);
        return result.rows[0];
    }
    async getAll() {
        const query = `select * from users where role='customer' order by id asc`;
        const result = await db_1.pool.query(query);
        return result.rows;
    }
    async getById(id) {
        const query = `select * from users where id=$1`;
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0] || null;
    }
    async getByEmail(email) {
        const query = 'select * from users where email = $1';
        const result = await db_1.pool.query(query, [email]);
        return result.rows[0] || null;
    }
    //in this store users can't delete their account they can deactivate it .
    async deactivate(id) {
        const query = `update users set active=false where id=$1 returning *`;
        const result = await db_1.pool.query(query, [id]);
        return result.rows[0] || null;
    }
    async search(search) {
        const query = `select * from users where first_name ilike $1 or last_name ilike $1 or email ilike $1 order by id asc`;
        const result = await db_1.pool.query(query, [`%${search}%`]);
        return result.rows;
    }
    async update(id, fields_updated) {
        const { first_name, last_name, active } = fields_updated;
        const query = `update users set 
  first_name=COALESCE($1, first_name),
  last_name=COALESCE($2, last_name),
   active = COALESCE($3, active)
   where id =$4 returning *

  `;
        const result = await db_1.pool.query(query, [first_name, last_name, active, id]);
        return result.rows[0] || null;
    }
    async updatePassword(id, password) {
        const hashedPassword = (0, hashPassword_1.hashPassword)(password);
        const query = 'update users set password = $1 where id = $2 returning *';
        const result = await db_1.pool.query(query, [hashedPassword, id]);
        return result.rows[0] || null;
    }
    async updateEmail(id, email) {
        if (!(0, validEmail_1.isValidEmail)(email))
            throw new Error("Email is not valid");
        const checkEmail = 'select * from users where email=$1';
        const checkResult = await db_1.pool.query(checkEmail, [email]);
        if (checkResult.rows.length > 0)
            throw new Error("email already exists");
        const query = 'update users set email = $1 where id = $2 returning *';
        const result = await db_1.pool.query(query, [email, id]);
        return result.rows[0] || null;
    }
}
exports.UserRepository = UserRepository;
