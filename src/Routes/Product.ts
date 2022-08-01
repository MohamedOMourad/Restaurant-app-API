import express from "express";
import { Product } from "../Entities/Product";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find({
            relations: { orderLine: true }
        });
        if (!products) return res.status(404).send("products not found!")
        res.status(200).send({ data: products });
    } catch (e) {
        res.status(500).send(e);
    }
});

productRouter.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const product = await Product.findOne({
            where: { id },
            relations: { orderLine: true }
        });
        if (!product) return res.status(404).send("product not found!");
        res.status(200).send({ data: product });
    } catch (e) {
        res.status(500).send(e);
    }
});

// productRouter.post("/", async (req, res) => {
//     try {
//         const { firstName, lastName, mobNum, city, address, orderDetails } = req.body;
//         if (!firstName || !lastName || !mobNum || !city || !address || !orderDetails) return res.status(401).send("missing data");
//         const order = Order.create({
//             firstName,
//             lastName,
//             mobNum,
//             city,
//             address,
//         })
//         if (!order) return res.status(404).send("order not found!");

//         await order.save();

//         for (let i = 0; i < orderDetails.length; i++) {
//             const orderLine = OrderLine.create(
//                 {
//                     quantity: orderDetails[i].quantity,
//                     product: orderDetails[i].product,
//                     order
//                 }
//             )
//             await orderLine.save()
//         };

//         res.status(201).send({ data: order })
//     } catch (e) {
//         res.status(500).send(e);
//     }
// });


// productRouter.delete("/:id", async (req, res) => {
//     try {
//         const id = +req.params.id;
//         const order = await Order.delete(id);
//         if (!order) return res.status(404).send("posts not found!");
//         res.status(200).send("delted succefully!");
//     } catch (e) {
//         res.status(500).send();
//     }
// });

export default productRouter;