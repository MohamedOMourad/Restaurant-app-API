import express from "express";
import { Order } from "../Entities/Order";
import { OrderLine } from "../Entities/OrderLine";

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
    try {
        const orders = await Order.find({
            relations: { orderLine: true }
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
        res.status(200).send({ data: order });
    } catch (e) {
        res.status(500).send(e);
    }
});

orderRouter.post("/", async (req, res) => {
    try {
        const { firstName, lastName, mobNum, city, address, orderDetails } = req.body;
        if (!firstName || !lastName || !mobNum || !city || !address || !orderDetails) return res.status(401).send("missing data");
        const order = Order.create({
            firstName,
            lastName,
            mobNum,
            city,
            address,
        })
        if (!order) return res.status(404).send("order not found!");

        await order.save();

        for (let i = 0; i < orderDetails.length; i++) {
            const orderLine = OrderLine.create(
                {
                    quantity: orderDetails[i].quantity,
                    product: orderDetails[i].product,
                    order
                }
            )
            await orderLine.save()
        };

        res.status(201).send({ data: order })
    } catch (e) {
        res.status(500).send(e);
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