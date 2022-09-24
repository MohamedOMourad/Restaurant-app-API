"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const Product_1 = require("../Entities/Product");
const Category_1 = require("../Entities/Category");
const Order_1 = require("../Entities/Order");
const OrderLine_1 = require("../Entities/OrderLine");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: +process.env.PGPORT,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [Product_1.Product, Category_1.Category, Order_1.Order, OrderLine_1.OrderLine],
    subscribers: [],
    migrations: [],
});
