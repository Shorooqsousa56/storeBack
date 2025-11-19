"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
afterAll(async () => {
    await db_1.pool.end();
});
