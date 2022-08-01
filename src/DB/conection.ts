import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Product } from "../Entities/Product";
import { Category } from "../Entities/Category";
import { Order } from "../Entities/Order";
import { OrderLine } from "../Entities/OrderLine";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: +process.env.PGPORT!,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: false,
    entities: [Product, Category, Order, OrderLine],
    subscribers: [],
    migrations: [],
});