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
const Order_1 = require("../Entities/Order");
const OrderLine_1 = require("../Entities/OrderLine");
const orderRouter = express_1.default.Router();
orderRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find({
            relations: { orderLine: { product: true } }
        });
        if (!orders)
            return res.status(404).send("posts not found!");
        res.status(200).send({ data: orders });
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
orderRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const order = yield Order_1.Order.findOne({
            where: { id },
            relations: { orderLine: true }
        });
        if (!order)
            return res.status(404).send("posts not found!");
        order.completed = true;
        yield order.save();
        res.status(200).send({ data: order });
    }
    catch (e) {
        res.status(500).send(e);
    }
}));
orderRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { firstName, lastName, mobNum, city, address, ordersCart } = req.body;
        if (!firstName || !lastName || !mobNum || !city || !address || ordersCart.length < 0)
            return res.status(401).send("missing data");
        const order = Order_1.Order.create({
            firstName,
            lastName,
            mobNum,
            city,
            address,
        });
        if (!order)
            return res.status(404).send("order not found!");
        yield order.save();
        for (let i = 0; i < (ordersCart === null || ordersCart === void 0 ? void 0 : ordersCart.length); i++) {
            let orderLine = OrderLine_1.OrderLine.create({
                quantity: ordersCart[i].quantity,
                product: ordersCart[i].id,
                order
            });
            yield orderLine.save();
        }
        ;
        res.status(201).send({ data: order });
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}));
orderRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "OrderId is required as params!" });
    }
    try {
        const order = yield Order_1.Order.findOne({ where: { id: +id } });
        if (!order) {
            return res.status(404).send({ message: "Order is not found!" });
        }
        order.completed = true;
        yield order.save();
        res.send({ order });
    }
    catch (e) {
        res.status(500).send({ error: "Server is down!" });
    }
}));
orderRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const order = yield Order_1.Order.delete(id);
        if (!order)
            return res.status(404).send("posts not found!");
        res.status(200).send("delted succefully!");
    }
    catch (e) {
        res.status(500).send();
    }
}));
exports.default = orderRouter;
