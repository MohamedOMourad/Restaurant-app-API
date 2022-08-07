import express from "express";
import { Order } from "../Entities/Order";
import { OrderLine } from "../Entities/OrderLine";

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
    try {
        const orders = await Order.find({
            relations: { orderLine: { product: true } }
        });
        if (!orders) return res.status(404).send("posts not found!")
        res.status(200).send({ data: orders });
    } catch (e) {
        res.status(500).send(e);
    }
});

orderRouter.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const order = await Order.findOne({
            where: { id },
            relations: { orderLine: true }
        });
        if (!order) return res.status(404).send("posts not found!");
        order.completed = true;
        await order.save();
        res.status(200).send({ data: order });
    } catch (e) {
        res.status(500).send(e);
    }
});

orderRouter.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, mobNum, city, address, ordersCart } = req.body;
        if (!firstName || !lastName || !mobNum || !city || !address || ordersCart.length < 0) return res.status(401).send("missing data");
        const order = Order.create({
            firstName,
            lastName,
            mobNum,
            city,
            address,
        })
        if (!order) return res.status(404).send("order not found!");

        await order.save();

        for (let i = 0; i < ordersCart?.length; i++) {
            let orderLine = OrderLine.create(
                {
                    quantity: ordersCart[i].quantity,
                    product: ordersCart[i].id,
                    order
                }
            )
            await orderLine.save()
        };

        res.status(201).send({ data: order })
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

orderRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "OrderId is required as params!" });
    }
    try {
        const order = await Order.findOne({ where: { id: +id } });
        if (!order) {
            return res.status(404).send({ message: "Order is not found!" });
        }
        order.completed = true;
        await order.save();
        res.send({ order })
    } catch (e) {
        res.status(500).send({ error: "Server is down!" });
    }
});

orderRouter.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const order = await Order.delete(id);
        if (!order) return res.status(404).send("posts not found!");
        res.status(200).send("delted succefully!");
    } catch (e) {
        res.status(500).send();
    }
});

export default orderRouter;