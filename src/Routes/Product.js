"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = require("../Entities/Product");
const productRouter = express_1.default.Router();
productRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find({
            relations: { orderLine: true }
        });
        if (!products)
            return res.status(404).send("products not found!");
        res.status(200).send({ data: products });
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
productRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const product = yield Product_1.Product.findOne({
            where: { id },
            relations: { orderLine: true }
        });
        if (!product)
            return res.status(404).send("product not found!");
        res.status(200).send({ data: product });
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
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
exports.default = productRouter;
