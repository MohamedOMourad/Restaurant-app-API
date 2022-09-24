import express from "express";
import { json, urlencoded } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { AppDataSource } from './DB/conection';
import orderRouter from './Routes/Order';
import productRouter from './Routes/Product';
const app = express();
config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/order', orderRouter)
app.use('/product', productRouter)

app.get("/", (req, res) => {
    res.status(200).send('How You Doin');
});
app.get("/*", (req, res) => {
    res.status(404).send({ error: "End Point NOt Found!" });
});

app.listen(process.env.PORT, async () => {
    try {
        await AppDataSource.initialize();
        console.log(`connected to the database`)
    } catch (error) {
        throw new Error(`${(error as Error).message}`)
    }
})